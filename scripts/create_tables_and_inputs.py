'''
The scripts/create_tables_and_inputs.py script does two jobs:
    1. Creates a `run_info_tables.duckdb` file
    2. Generates `input.json` file
    
`run_info_tables.duckdb` file is uploaded as a job artifact and used on later steps.
It contains the tables:
    'gh_run_list_{ nightly_build }',
    'steps_{ nightly_build }',
    'artifacts_{ nightly_build }',
    'artifacts_per_jobs_{ nightly_build }' - used as it is in `create_build_report.py`

`input.json` file contains an array of json objects which will be used to create next job's matrix
    or, in case all listed nightly-builds had failed, an empty array, then the next job will be skipped. 
Each object has following fields:
{
    "nightly_build": "LinuxRelease",
    "platform": "linux",
    "architectures": "amd64",
    "runs_on": "ubuntu-latest",
    "run_id": "12021416084"
}
If any of nightly-builds uploads builds for different architectures, then
    for each architecture a separate object is being generated.

Currently we're checking only three nightly-build names: OSX, LinuxRelease, Windows.
    It's possible to check more of them if adding more values to the list of "--jq"
    parameters in `list_all_runs()` from shared_functions.py:
        "--jq", (
            '.[] | select(.name == ("OSX", "LinuxRelease", "Windows")) '

Can be tested locally running 'python scripts/create_tables_and_inputs.py'.
'''

import duckdb
import datetime
import argparse
import subprocess
import json
import os
import re
from collections import defaultdict
from shared_functions import fetch_data
from shared_functions import list_all_runs
from shared_functions import count_consecutive_failures
from shared_functions import BuildJob

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
DUCKDB_FILE = 'run_info_tables.duckdb'
SHOULD_BE_TESTED = ('python', 'osx', 'linux', 'windows')

def get_value_for_key(key, build_job):
    value = duckdb.sql(f"""
        SELECT { key } 
        FROM read_json('{ build_job.get_build_job_file_name() }') 
        WHERE status = 'completed' 
        ORDER BY createdAt DESC
        """).fetchone()[0]
    return value

def save_run_data_to_json_files(build_job, con, build_job_run_id):
    '''
    Fetches GH Actions data related to specified nightly-build and saves it into json files.
    As result "{build_job}.json", "{ build_job }_jobs.json" and "{ build_job }_artifacts.json"
    files are created. They will be used by create_tables_for_report()
    '''
    jobs_command = [
            "gh", "run", "view",
            "--repo", GH_REPO,
            f"{ build_job_run_id }",
            "--json", "jobs"
        ]
    fetch_data(jobs_command, build_job.get_jobs_file_name())
    artifacts_command = [
            "gh", "api",
            f"repos/{ GH_REPO }/actions/runs/{ build_job_run_id }/artifacts"
        ]
    fetch_data(artifacts_command, build_job.get_artifacts_file_name())

def create_tables_for_report(build_job, con):
    '''
    In 'run_info_tables.duckdb' file creates '{ build_job }_gh_run_list', 'steps_{ build_job }'
        and 'artifacts_{ build_job }' tables from json files created on save_run_data_to_json_files()
    Using 'steps' and 'artifacts' tables creates '{ build_job }_artifacts_per_jobs' table 
        for the final report.
    '''
    con.execute(f"""
        CREATE OR REPLACE TABLE '{ build_job.get_run_list_table_name() }' AS (
            SELECT *
            FROM '{ build_job.get_build_job_file_name() }')
            ORDER BY createdAt DESC
    """)
    con.execute(f"""
        CREATE OR REPLACE TABLE '{ build_job.get_steps_table_name() }' AS (
            SELECT * FROM read_json('{ build_job.get_jobs_file_name() }')
        )
    """)
    con.execute(f"""
            CREATE OR REPLACE TABLE '{ build_job.get_artifact_table_name() }' AS (
                SELECT * FROM read_json('{ build_job.get_artifacts_file_name() }')
            );
        """)
    # check if the artifatcs table is not empty
    artifacts_count = con.execute(f"SELECT list_count(artifacts) FROM '{ build_job.get_artifact_table_name() }';").fetchone()[0]
    if artifacts_count > 0:
        # Given a job and its steps, we want to find the artifacts uploaded by the job 
        # and make sure every 'upload artifact' step has indeed uploaded the expected artifact.
        url = get_value_for_key("url", build_job)
        base_url = f"{ url }/artifacts/"
        con.execute(f"""
            CREATE OR REPLACE TABLE '{ build_job.get_artifacts_per_jobs_table_name() }' AS (
                SELECT
                    t1.job_name AS "Build (Architecture)",
                    t1.conclusion AS "Conclusion",
                    '[' || t2.name || '](' || '{ base_url }' || t2.artifact_id || ')' AS "Artifact",
                    t2.updated_at AS "Uploaded at"
                FROM (
                    SELECT
                        job_name,
                        steps.name step_name, 
                        steps.conclusion conclusion,
                        steps.startedAt startedAt
                    FROM (
                        SELECT
                            unnest(steps) steps,
                            job_name 
                        FROM (
                            SELECT
                                unnest(jobs)['steps'] steps,
                                unnest(jobs)['name'] job_name 
                            FROM '{ build_job.get_steps_table_name() }'
                            )
                        )
                    WHERE steps['name'] LIKE '%upload%'
                    ORDER BY 
                        conclusion DESC,
                        startedAt
                    ) t1
                POSITIONAL JOIN (
                    SELECT
                        artifacts.name,
                        artifacts.expires_at expires_at,
                        artifacts.updated_at updated_at,
                        artifacts.id artifact_id
                    FROM (
                        SELECT
                            unnest(artifacts) artifacts
                        FROM '{ build_job.get_artifact_table_name() }'
                        )
                    ORDER BY expires_at
                    ) as t2
                );
            """)

def get_runner(platform, architecture):
    match platform:
        case 'osx':
            return "macos-latest" if architecture == 'arm64' else "macos-13"
        case 'windows':
            return "windows-2019"
        case _:
            return "ubuntu-22.04-arm" if architecture == 'arm64' else "ubuntu-latest"

def get_artifacts_list(con, build_job, artifatc_type):
    artifacts = con.execute(f"""
        SELECT Artifact
        FROM '{ build_job.get_artifacts_per_jobs_table_name() }'
        WHERE Artifact LIKE '[duckdb-{ artifatc_type }%';
    """).fetchall()
    return artifacts

def get_tested_binaries_set(con, build_job):
    # array of testable binaries like 'windows-amd64' extracted from a line 
    # like '[duckdb-binaries-windows-amd64](https://github.com/duckdb/duckdb/actions/runs/13275346242/artifacts/2575624860)'
    # but we replace an underscore with a dash to match with the extensions names
    build_artifacts = get_artifacts_list(con, build_job, "binaries")
    tested_binaries = set()
    for row in build_artifacts:
        pattern = r'\[duckdb-binaries-([a-zA-Z]+)(?:-([a-zA-Z0-9]+))?\]'
        match = re.search(pattern, row[0])
        if match:
            build_platform = match.group(1)
            build_architecture = match.group(2) if match.group(2) else ''
            if build_architecture:
                tested_binaries.add(build_platform + "_" + build_architecture)
            elif build_platform == 'osx':
                tested_binaries.add(build_platform + "_arm64")
                tested_binaries.add(build_platform + "_amd64")
    return tested_binaries

def create_inputs(build_job, con, build_job_run_id):
    matrix_data = []
    tested_binaries = get_tested_binaries_set(con, build_job)
    extensions_artifacts = get_artifacts_list(con, build_job, "extensions")
    tested_builds_dict = {}
    for row in extensions_artifacts:
        pattern =  r'\[duckdb-extensions-([a-zA-Z]+)_(amd64|arm64)'
        match = re.search(pattern, row[0])
        if match:
            platform = match.group(1)
            architecture = match.group(2)
            duckdb_arch = platform + "_" + architecture
            if duckdb_arch in tested_binaries:
                tested_binaries.remove(duckdb_arch)
                new_data = {
                    "nightly_build": platform,
                    "duckdb_arch": architecture,
                    "runs_on": get_runner(platform, architecture),
                    "run_id": build_job_run_id,
                    "duckdb_binary": platform if platform == 'osx' else platform + "-" + architecture
                }
                matrix_data.append(new_data)
                # also add python extensions for linux, ignore windows and ubuntu for now
                if platform.startswith('linux'):
                    new_data = {
                        "nightly_build": "python",
                        "duckdb_arch": architecture,
                        "runs_on": get_runner(platform, architecture),
                        "run_id": build_job_run_id,
                        "duckdb_binary": platform + "-" + architecture
                    }
                    matrix_data.append(new_data)
    return matrix_data

def main():
    build_job = BuildJob("InvokeCI")
    if os.path.isfile(DUCKDB_FILE):
        os.remove(DUCKDB_FILE)
    con = duckdb.connect(DUCKDB_FILE)
    list_all_runs(con, build_job)
    build_job_run_id = get_value_for_key("databaseId", build_job)
    save_run_data_to_json_files(build_job, con, build_job_run_id)
    create_tables_for_report(build_job, con)

    matrix_data = create_inputs(build_job, con, build_job_run_id)
    print("#####", matrix_data)
    with open("inputs.json", "w") as f:
        json.dump(matrix_data, f, indent=4)
    con.close()
    
if __name__ == "__main__":
    main()
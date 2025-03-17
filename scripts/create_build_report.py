'''
The scripts/create_build_report.py script job is to create a final report file "{ CURR_DATE }-report.md".
    For each name of nightly-build it writes the latest run's conclusion, in case of failure,
    followed with a list of last 7 failed runs.
    Then it adds '{ build_job }_artifacts_per_jobs' table contents.

Can be tested locally running 'python scripts/create_tables_and_inputs.py' with preconditions:
    1. Run 'scripts/create_build_report.py'.
    2. mkdir tables && mv run_info_tables.duckdb tables
'''

import argparse
import duckdb
import datetime
import glob
import json
import os
import pandas as pd
import re
import subprocess
import tabulate
from collections import defaultdict
from shared_functions import fetch_data
from shared_functions import list_all_runs
from shared_functions import list_extensions
from shared_functions import count_consecutive_failures
from shared_functions import BuildJob

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
CURR_DATE = os.environ.get('CURR_DATE', datetime.datetime.now().strftime('%Y-%m-%d'))

parser = argparse.ArgumentParser()
parser.add_argument("--branch")
args = parser.parse_args()
branch = args.branch
REPORT_FILE = f"{ CURR_DATE }-{ branch }.md"

def create_build_report(build_job, con):
    failures_count = count_consecutive_failures(build_job, con)
    select_data = con.execute(f"SELECT headSha, url, createdAt, displayTitle, number FROM '{ build_job.get_run_list_table_name() }' ORDER BY createdAt DESC").fetchone()
    run_sha, run_url, run_date, run_name, run_number = select_data[0][:7], select_data[1], select_data[2], select_data[3], select_data[4] if select_data else 'No runs were found'
    report_title = f"\n\n## { build_job.get_build_job_name() }: { run_name } #{ run_number } - Commit [{ run_sha }]({ run_url }) ({ run_date })\n"

    with open(REPORT_FILE, 'a') as f:
        f.write(f"---\nlayout: post\ntitle: { CURR_DATE } - { run_sha }\nparent: { branch.upper() }\n---\n")
        if failures_count == 0:       
            f.write(f"{ report_title } Run succeeded\n{{: .label .label-green}}\n\n{ branch }\n{{: .label .label-yellow}}\n\n")
            f.write(f"#### Latest run: [ { run_date } ]({ run_url })\n")
        else:
            # failures_count = -1 means all runs in the json file have conclusion = 'failure' 
            # so we need to update its value.
            # We count all runs and do not add a last successfull run link to the report
            if failures_count == -1:
                failures_count = con.execute(f"""
                    SELECT
                        count(*)
                    FROM '{ build_job.get_run_list_table_name() }'
                    WHERE conclusion = 'failure'
                """).fetchone()[0]
        
            total_count = con.execute(f"""
                SELECT
                    count(*)
                FROM '{ build_job.get_run_list_table_name() }'
            """).fetchone()[0]

            if failures_count == total_count:
                f.write(f"{ report_title } Run failed\n{{: .label .label-red}}\n\n{ branch }\n{{: .label .label-yellow}}\n\n")
                f.write(f"{ build_job.get_build_job_name() } has not succeeded more than **{ failures_count }** times.\n")
            else:
                f.write(f"{ report_title } Run failed\n{{: .label .label-red}}\n\n{ branch }\n{{: .label .label-yellow}}\n\n")
                f.write(f"{ build_job.get_build_job_name() } has not succeeded the previous **{ failures_count }** times.\n")
            print("failures_count: ", failures_count, "total_count: ", total_count)
            if failures_count < total_count:
                tmp_data = con.execute(f"""
                    SELECT
                        createdAt, url
                    FROM '{ build_job.get_run_list_table_name() }'
                    WHERE conclusion = 'success'
                    ORDER BY createdAt DESC
                """).fetchone()
                latest_success_date = tmp_data[0] if tmp_data else ''
                latest_success_url = tmp_data[1] if tmp_data else ''
                if latest_success_date:
                    f.write(f"#### Latest successfull run: [ { latest_success_date } ]({ latest_success_url })\n")

            f.write(f"\n### Failure Details\n\n")
            failure_details = con.execute(f"""
                SELECT
                    job_name as 'Failed Jobs',
                    steps as 'Steps',
                    startedAt as 'Started At'
                FROM '{ build_job.get_failed_jobs_table_name() }'
            """).df()
            f.write(failure_details.to_markdown(index=False) + "\n")
        
        # add extensions
        inputs = f"inputs_{ branch }.json"
        if os.path.exists(inputs) and os.path.getsize(inputs) > 0:
            # add summary for extensions installing and loading chiecks
            file_name_pattern = f"{ branch }_failed_ext/{ branch }_ext*/{ branch }_list_failed_ext*.csv"
            matching_files = glob.glob(file_name_pattern)
            if matching_files:
                ext_results = "extensions_checking_results"
                con.execute(f"""
                    CREATE OR REPLACE TABLE { ext_results } AS (
                        SELECT * FROM read_csv('{ file_name_pattern }'));
                    """)
                if failures_count > 0:
                    result = con.execute(f"SELECT nightly_build, duckdb_arch FROM '{ inputs }'").fetchall()
                    if branch == 'main':
                        tested_binaries = [row[0] + "-" + row[1] + "_gcc4" if row[0] == 'linux' else row[0] + "-" + row[1] for row in result]
                    else:
                        tested_binaries = []
                        for row in result:
                            if row.count('linux'):
                                tested_binary = row[0] + "-" + row[1] + "_gcc4" if row[1] == 'amd64' else row[0] + "-arm64" 
                            else:
                                tested_binary = row[0] + "-" + row[1]
                            tested_binaries.append(tested_binary)
                        print(tested_binaries)
                else:
                    result = con.execute(f"SELECT DISTINCT nightly_build, tested_platform FROM '{ ext_results }'").fetchall()
                    tested_binaries = [second_value for first_value, second_value in result if first_value != 'python']
                join_list = ""
                for binary in tested_binaries:
                    if not binary.startswith('python'):
                        binary = binary.replace("-", "_")
                        join_list += f'i."{ binary }".concat(l."{ binary }") as "{ binary }", '
                if len(join_list) > 0:
                    print(join_list)
                    con.execute(f"""CREATE OR REPLACE TABLE results AS (
                            SELECT *, CASE 
                                WHEN result = 'passed' 
                                THEN ': ✅ ' 
                                ELSE ': ❌ ' END AS res 
                            FROM { ext_results } 
                            WHERE nightly_build != 'python');
                        """)
                    con.execute(f"""CREATE OR REPLACE TABLE loads AS (
                            SELECT * FROM (
                                PIVOT results
                                ON tested_platform 
                                USING min(statement.concat(res)) 
                            GROUP BY "extension", "statement"
                            ORDER BY "extension"
                            )
                        WHERE "statement" = 'LOAD');
                        """)
                    con.execute(f"""CREATE OR REPLACE TABLE installs AS (
                            SELECT * FROM (
                                PIVOT results
                                ON tested_platform
                                USING min(statement.concat(res))
                            GROUP BY "extension", "statement"
                            ORDER BY "extension"
                            )
                        WHERE "statement" = 'INSTALL');
                    """)
                    ext_results_table = con.execute(f"""
                        SELECT i."extension",
                            { join_list }
                        FROM installs AS i
                        JOIN loads AS l
                        ON i."extension"=l."extension";
                    """).df()
                    f.write(f"\n### Extensions Summary:\n\n")
                    f.write(ext_results_table.to_markdown(index=False) + '\n')

            py_file_name_pattern = f"{ branch }_failed_ext/{ branch }_ext_python*/{ branch }_list_failed_ext_python*.csv"
            matching_files = glob.glob(py_file_name_pattern)
            py_join_list = ""
            if matching_files:
                select_py_versions = duckdb.sql(f"SELECT DISTINCT version, architecture FROM '{ py_file_name_pattern }'").fetchall()
                tested_py_versions = [row[0] + "_" + row[1] for row in select_py_versions]
                print(tested_py_versions)
                if tested_py_versions:
                    for version in tested_py_versions:
                        py_join_list += f'i."python_{ version }".concat(l."python_{ version }") AS "python_{ version }",'

            if len(py_join_list) > 0:
                print(py_join_list)
                con.execute(f"""
                    CREATE OR REPLACE TABLE py_ext_results AS (
                        SELECT * FROM read_csv('{ file_name_pattern }'));
                    """)
                con.execute(f"""
                    CREATE OR REPLACE TABLE py_results AS (
                        SELECT *, CASE 
                            WHEN result = 'passed' 
                            THEN ': ✅ ' 
                            ELSE ': ❌ ' END AS res 
                        FROM py_ext_results
                        WHERE nightly_build = 'python');
                    """)
                con.execute(f"""
                        CREATE OR REPLACE TABLE py_loads AS (
                            SELECT * FROM (
                                PIVOT py_results 
                                ON nightly_build, version, architecture
                                USING min(statement.concat(res)) 
                            GROUP BY "extension", "statement"
                            ORDER BY "extension"
                            )
                        WHERE "statement" = 'LOAD');
                """)
                con.execute(f"""
                    CREATE OR REPLACE TABLE py_installs AS (
                        SELECT * FROM (
                            PIVOT py_results
                            ON nightly_build, version, architecture
                            USING min(statement.concat(res)
                            )
                            GROUP BY "extension", "statement"
                            ORDER BY "extension"
                        )
                        WHERE "statement" = 'INSTALL');
                """)
                py_ext_results_table = con.execute(f"""
                    SELECT i."extension",
                        { py_join_list }
                    FROM py_installs AS i
                    JOIN py_loads AS l
                    ON i."extension"=l."extension";
                """).df()
                f.write(f"\n### Extensions Summary:\n\n")
                f.write(py_ext_results_table.to_markdown(index=False) + '\n')

            for tested_binary in tested_binaries:
                tested_binary = tested_binary + "_" + architecture if tested_binary == 'osx' else tested_binary.replace("-", "_")
                # add unmatching sha
                file_name_pattern = f"{ branch }_failed_ext/{ branch }_ext_{ tested_binary }*/{ branch }_non_matching_sha_{ tested_binary }*.csv"
                matching_files = glob.glob(file_name_pattern)
                if matching_files:
                    unmatched = con.execute(f"""
                        SELECT * 
                        FROM read_csv('{ file_name_pattern }' )
                    """).df()
                    f.write(f"\n#### Found unmatching versions:\n\n")
                    f.write(unmatched.to_markdown(index=False) + "\n")
            # can be also in { branch }_failed_ext/
            
            file_name_pattern = f"{ branch }_failed_ext/{ branch }_non_matching_sha_*.csv"
            matching_files = glob.glob(file_name_pattern)
            if matching_files:
                unmatched = con.execute(f"""
                    SELECT * 
                    FROM read_csv('{file_name_pattern}', DELIM = ',', HEADER=False)
                """).df()
                f.write(f"\n#### Found unmatching versions:\n\n")
                f.write(unmatched.to_markdown(index=False) + "\n")
        
        if failures_count > 0:            
            f.write(f"\n### Previously Failed (max 7 shown)\n\n")
            failures_count = 7 if failures_count > 7 else failures_count
            previously_failed = con.execute(f"""
                SELECT
                    headSha.concat(' - [' || createdAt || '](' || url || ')')
                FROM '{ build_job.get_run_list_table_name() }'
                WHERE conclusion != 'success'
                ORDER BY createdAt DESC
                LIMIT { failures_count }
            """).fetchall()
            pr_f = ['- ' + pf[0] for pf in previously_failed]
            f.write('\n'.join(pr_f) + '\n')
        
        f.write(f"\n### Diff of Uploaded Artifacts\nMatched atrifact names are hidden.\n\n")
        extensions_lists = con.execute(f"""
            SELECT 
                expected AS 'Missing or Renamed Artifacts in Release CI',
                actual AS 'New or Renamed Artifacts in the Current CI Run'
            FROM extensions_lists ORDER BY ALL;
        """).df()
        f.write(extensions_lists.to_markdown(index=False) + "\n")
        f.write(f"\n### Workflow Artifacts\n\n")
        artifacts_per_job = con.execute(f"""
            SELECT * FROM '{ build_job.get_artifacts_per_jobs_table_name() }'
            ORDER BY "Build (Architecture)" ASC;
            """).df()
        f.write(artifacts_per_job.to_markdown(index=False) + "\n")


def main():
    build_job = BuildJob('InvokeCI')
    db_name = f'{ branch }_tables/{ branch }_run_info_tables.duckdb'
    con = duckdb.connect(db_name)
    create_build_report(build_job, con)
    con.close()
    
if __name__ == "__main__":
    main()

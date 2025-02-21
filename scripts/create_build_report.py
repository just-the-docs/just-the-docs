'''
The scripts/create_build_report.py script job is to create a final report file "{ CURR_DATE }-report.md".
    For each name of nightly-build it writes the latest run's conclusion, in case of failure,
    followed with a list of last 7 failed runs.
    Then it adds '{ build_job }_artifacts_per_jobs' table contents.

Can be tested locally running 'python scripts/create_tables_and_inputs.py' with preconditions:
    1. Run 'scripts/create_build_report.py'.
    2. mkdir tables && mv run_info_tables.duckdb tables
'''

import duckdb
import datetime
import pandas as pd
import tabulate
import subprocess
import json
import os
import glob
import re
from collections import defaultdict
from shared_functions import fetch_data
from shared_functions import list_all_runs
from shared_functions import count_consecutive_failures
from shared_functions import BuildJob

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
CURR_DATE = os.environ.get('CURR_DATE', datetime.datetime.now().strftime('%Y-%m-%d'))
REPORT_FILE = f"{ CURR_DATE }-report.md"

def create_build_report(build_job, con):
    url = con.execute(f"""
        SELECT url FROM '{ build_job.get_run_list_table_name() }' LIMIT 1
        """).fetchone()[0]
    failures_count = count_consecutive_failures(build_job, con)

    with open(REPORT_FILE, 'a') as f:
        f.write(f"---\nlayout: post\ntitle: 'Nightly Build Report'\ndate: { CURR_DATE }\n---\n\n")
        if failures_count == 0:
            f.write(f"\n\n")            
            f.write(f"\n## { build_job.get_build_job_name() }\n")            
            f.write(f"\n\n### { build_job.get_build_job_name() } nightly-build has succeeded.\n")            
            f.write(f"Latest run: [ Run Link ]({ url })\n")
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
                f.write(f"### { build_job.get_build_job_name() } nightly-build has not succeeded more than **{ failures_count }** times.\n")
            else:
                f.write(f"### { build_job.get_build_job_name() } nightly-build has not succeeded the previous **{ failures_count }** times.\n")
            if failures_count < total_count:
                tmp_url = con.execute(f"""
                    SELECT
                        url
                    FROM '{ build_job.get_run_list_table_name() }'
                    WHERE conclusion = 'success'
                    ORDER BY createdAt DESC
                    LIMIT 1
                """).fetchone()
                latest_success_url = tmp_url[0] if tmp_url else ''
                f.write(f"Latest successfull run: [ Run Link ]({ latest_success_url })\n")

            f.write(f"\n#### Failure Details\n\n")
            failure_details = con.execute(f"""
                SELECT
                    conclusion as "Conclusion",
                    createdAt as "Created at",
                    url as "URL"
                FROM '{ build_job.get_run_list_table_name() }'
                WHERE conclusion != 'success'
                ORDER BY createdAt DESC
                LIMIT 7
            """).df()
            markdown_table = failure_details.to_markdown(index=False)
            lines = markdown_table.splitlines()
            lines[1] = '-' * len(lines[1])
            cleaned_markdown_table = '\n'.join(lines)

            f.write(cleaned_markdown_table + "\n")
            # f.write(failure_details.to_markdown(index=False) + "\n")
            
        f.write(f"\n#### Workflow Artifacts\n\n")
        artifacts_per_job = con.execute(f"""
            SELECT * FROM '{ build_job.get_artifacts_per_jobs_table_name() }' ORDER BY "Build (Architecture)" ASC;
            """).df()
        f.write(artifacts_per_job.to_markdown(index=False) + "\n")
        
        # add extensions
        inputs = "inputs.json"
        if os.path.exists(inputs) and os.path.getsize(inputs) > 0:
            print("🥵")
            result = con.execute(f"SELECT nightly_build, duckdb_arch FROM '{ inputs }'").fetchall()
            tested_binaries = [row[0] + "-" + row[1] for row in result]
            print(tested_binaries)
            for tested_binary in tested_binaries:
                tested_binary = tested_binary + "_" + architecture if tested_binary == 'osx' else tested_binary.replace("-", "_")
                file_name_pattern = f"failed_ext/ext_{ tested_binary }*/list_failed_ext_{ tested_binary }*.csv"
                matching_files = glob.glob(file_name_pattern)
                if matching_files:
                    f.write(f"\n## { tested_binary }\n")
                    f.write("\n#### Tested extensions\n")
                    passed = con.execute(f"""
                        SELECT extension
                        FROM read_csv('{ file_name_pattern }')
                        WHERE result = 'passed' AND statement = 'INSTALL'
                        INTERSECT(
                            SELECT extension
                            FROM read_csv('{ file_name_pattern }')
                            WHERE result = 'passed' AND statement = 'LOAD'
                            ORDER BY extension ASC
                        )
                    """).fetchall()
                    passed_extentions = [p[0] for p in passed]
                    f.write(f"The following extensions could be loaded and installed successfully:\n##### { passed_extentions }\n")
                    
                    failed_extensions = con.execute(f"""
                        SELECT * FROM read_csv('{ file_name_pattern }')
                        WHERE result = 'failed'
                    """).df()
                    if failed_extensions.empty:
                        f.write(f"None of extensions had failed to be installed or loaded.\n")
                    else:
                        f.write("#### List of failed extensions:\n\n")
                        f.write(failed_extensions.to_markdown(index=False) + "\n")
                else:
                    file_name_pattern = f"failed_ext/ext_{ tested_binary }*/non_matching_sha_{ tested_binary }*.txt"
                    matching_files = glob.glob(file_name_pattern)
                    if matching_files:
                        f.write(f"\n## { tested_binary }\n")
                        for file in matching_files:
                            with open(file, 'r') as src:
                                content = src.read()
                            f.write(f"#### { file }:")
                            f.write(content)
    
def main():
    build_job = BuildJob('InvokeCI')
    db_name = 'tables/run_info_tables.duckdb'
    con = duckdb.connect(db_name)
    create_build_report(build_job, con)
    con.close()
    
if __name__ == "__main__":
    main()
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
from shared_functions import list_extensions
from shared_functions import count_consecutive_failures
from shared_functions import BuildJob

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
CURR_DATE = os.environ.get('CURR_DATE', datetime.datetime.now().strftime('%Y-%m-%d'))
REPORT_FILE = f"{ CURR_DATE }-report.md"

def create_build_report(build_job, con):
    failures_count = count_consecutive_failures(build_job, con)
    select_data = con.execute(f"SELECT headSha, url, createdAt FROM '{ build_job.get_run_list_table_name() }' ORDER BY createdAt DESC").fetchone()
    run_sha, run_url, run_date = select_data[0][:7], select_data[1], select_data[2] if select_data else 'No runs were found'

    with open(REPORT_FILE, 'a') as f:
        f.write(f"---\nlayout: post\ntitle: { CURR_DATE } - { run_sha }\nparent: Reports\n---\n")
        if failures_count == 0:       
            f.write(f"\n\n## { build_job.get_build_job_name() } [{ run_sha }]({ run_url })\n Succeeded\n{: .label .label-green }\n")            
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
                f.write(f"## { build_job.get_build_job_name() } [{ run_sha }]({ run_url }) \n Failed\n{: .label .label-red }\n Has not succeeded more than **{ failures_count }** times.\n")
            else:
                f.write(f"## { build_job.get_build_job_name() } [{ run_sha }]({ run_url }) \n Failed\n{: .label .label-red }\n Has not succeeded the previous **{ failures_count }** times.\n")
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

            f.write(f"\n### Previously Failed\n\n")
            failures_count = 7 if failures_count > 7 else failures_count
            previously_failed = con.execute(f"""
                SELECT
                    conclusion as "Conclusion",
                    '[' || createdAt || '](' || url || ')' as "Created at"
                FROM '{ build_job.get_run_list_table_name() }'
                WHERE conclusion != 'success'
                ORDER BY createdAt DESC
                LIMIT { failures_count }
            """).df()
            f.write(previously_failed.to_markdown(index=False) + "\n")
            
        f.write(f"\n### Workflow Artifacts\n\n")
        artifacts_per_job = con.execute(f"""
            SELECT * FROM '{ build_job.get_artifacts_per_jobs_table_name() }' ORDER BY "Build (Architecture)" ASC;
            """).df()
        f.write(artifacts_per_job.to_markdown(index=False) + "\n")
        
        # add extensions
        inputs = "inputs.json"
        if os.path.exists(inputs) and os.path.getsize(inputs) > 0:
            result = con.execute(f"SELECT nightly_build, duckdb_arch FROM '{ inputs }'").fetchall()
            tested_binaries = [row[0] + "-" + row[1] for row in result]
            # add ext per binary
            file_name_pattern = f"failed_ext/ext*/list_failed_ext*.csv"
            matching_files = glob.glob(file_name_pattern)
            if matching_files:
                join_list = ""
                for binary in tested_binaries:
                    if not binary.startswith('python'):
                        binary = binary.replace("-", "_")
                        join_list += f'i."{ binary }".concat(l."{ binary }") as "{ binary }", '
                if len(join_list) > 0:
                    con.execute(f"""
                        CREATE OR REPLACE TABLE ext_results AS (
                            SELECT * FROM read_csv('{ file_name_pattern }'));
                        """)
                    con.execute(f"""CREATE OR REPLACE TABLE results AS (
                            SELECT *, CASE 
                                WHEN result = 'passed' 
                                THEN ': ✅ ' 
                                ELSE ': ❌ ' END AS res 
                            FROM ext_results 
                            WHERE nightly_build != 'python');
                        """)
                    con.execute(f"""CREATE OR REPLACE TABLE loads AS (
                            SELECT * FROM (
                                PIVOT results 
                                ON nightly_build, architecture 
                                USING min(statement.concat(res)) 
                            GROUP BY "extension", "statement"
                            ORDER BY "extension"
                            )
                        WHERE "statement" = 'LOAD');
                        """)
                    con.execute(f"""CREATE OR REPLACE TABLE installs AS (
                            SELECT * FROM (
                                PIVOT results
                                ON nightly_build, architecture
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
                    f.write(f"\n### Extensions Checking Results:\n\n")
                    f.write(ext_results_table.to_markdown(index=False) + '\n')

            py_file_name_pattern = f"failed_ext/ext_python*/list_failed_ext_python*.csv"
            matching_files = glob.glob(py_file_name_pattern)
            if matching_files:
                select_py_versions = duckdb.sql(f"SELECT DISTINCT version, architecture FROM '{ py_file_name_pattern }'").fetchall()
                tested_py_versions = [row[0] + "_" + row[1] for row in select_py_versions]
                print(tested_py_versions)
                py_join_list = ""
                if tested_py_versions:
                    for version in tested_py_versions:
                            py_join_list += f'i."python_{ version }".concat(l."python_{ version }") AS "python_{ version }",'

            if len(py_join_list) > 0:
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
                f.write(f"\n### Extensions Checking Results for Python builds:\n\n")
                f.write(py_ext_results_table.to_markdown(index=False) + '\n')

            for tested_binary in tested_binaries:
                tested_binary = tested_binary + "_" + architecture if tested_binary == 'osx' else tested_binary.replace("-", "_")
            #     # add failed extensions
            #     file_name_pattern = f"failed_ext/ext_{ tested_binary }*/list_failed_ext_{ tested_binary }*.csv"
            #     matching_files = glob.glob(file_name_pattern)
            #     if matching_files:
            #         f.write(f"\n## { tested_binary }\n")
            #         passed = con.execute(f"""
            #             SELECT extension
            #             FROM read_csv('{ file_name_pattern }')
            #             WHERE result = 'passed' AND statement = 'INSTALL'
            #             INTERSECT(
            #                 SELECT extension
            #                 FROM read_csv('{ file_name_pattern }')
            #                 WHERE result = 'passed' AND statement = 'LOAD'
            #                 ORDER BY extension ASC
            #             )
            #         """).fetchall()
            #         passed_extentions = [p[0] for p in passed]
            #         select_list = "*" if tested_binary.startswith('python') else "nightly_build, architecture, runs_on, extension, statement"
            #         failed_extensions = con.execute(f"""
            #             SELECT { select_list } FROM read_csv('{ file_name_pattern }')
            #             WHERE result = 'failed'
            #         """).df()
            #         if tested_binary.startswith('python'):
            #             tested_extensions = str(set(passed_extentions).union(set(failed_extensions))).strip("{}")
            #             f.write(f"#### Tested extensions:\n> { tested_extensions }\n")
            #         if len(passed_extentions) > 0 and not tested_binary.startswith('python'):
            #             passed_extentions_string = str(passed_extentions).strip("[]")
            #             f.write(f"#### The following extensions could be loaded and installed successfully:\n> { passed_extentions_string }\n")
            #         if failed_extensions.empty:
            #             f.write(f"\n All extensions had been successfully installed and loaded.\n")
            #         else:
            #             f.write("\n### List of failed extensions:\n\n")
            #             f.write(failed_extensions.to_markdown(index=False) + "\n")
                # add unmatching sha
                file_name_pattern = f"failed_ext/ext_{ tested_binary }*/non_matching_sha_{ tested_binary }*.csv"
                matching_files = glob.glob(file_name_pattern)
                if matching_files:
                    unmatched = con.execute(f"""
                        SELECT * 
                        FROM read_csv('{ file_name_pattern }' )
                    """).df()
                    f.write(f"\n#### Found unmatching versions:\n\n")
                    f.write(unmatched.to_markdown(index=False) + "\n")
    
def main():
    build_job = BuildJob('InvokeCI')
    db_name = 'tables/run_info_tables.duckdb'
    con = duckdb.connect(db_name)
    create_build_report(build_job, con)
    con.close()
    
if __name__ == "__main__":
    main()
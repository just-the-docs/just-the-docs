import subprocess
import duckdb
import datetime
import os

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
CURR_DATE = os.environ.get('CURR_DATE', datetime.datetime.now().strftime('%Y-%m-%d'))

class BuildJob:
    def __init__(self, build_job_name):
        self.build_job_name = build_job_name
    
    def get_build_job_name(self):
        print(f"🪸 { self.build_job_name } 🪸")
        return self.build_job_name

    def get_build_job_file_name(self):
        print(f"{ self.build_job_name }.json")
        return f"{ self.build_job_name }.json"

    def get_artifact_table_name(self):
        print(f"{ self.build_job_name }__artifacts_table")
        return f"{ self.build_job_name }_artifacts"

    def get_steps_table_name(self):
        print(f"{ self.build_job_name }_steps_table")
        return f"{ self.build_job_name }_steps"

    def get_artifacts_per_jobs_table_name(self):
        print(f"{ self.build_job_name }__artifacts_per_jobs_table")
        return f"{ self.build_job_name }_artifacts_per_jobs"

    def get_run_list_table_name(self):
        print(f"{ self.build_job_name }_gh_run_list_table")
        return f"{ self.build_job_name }_gh_run_list"

    def get_run_list_file_name(self):
        print(f"{ self.build_job_name }_gh_run_list.json")
        return f"{ self.build_job_name }_gh_run_list.json"

    def get_artifacts_file_name(self):
        print(f"{ self.build_job_name }_artifacts.json")
        return f"{ self.build_job_name }_artifacts.json"

    def get_jobs_file_name(self):
        print(f"{ self.build_job_name }_jobs.json")
        return f"{ self.build_job_name }_jobs.json"

# save command execution results into an f_output file
def fetch_data(command, f_output): 
    data = open(f_output, "w")
    try:
        subprocess.run(command, stdout=data, stderr=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {e.stderr}")

# create a json file with the list all nightly-build runs for current date
def list_all_runs(con, build_job):
    gh_run_list_command = [
        "gh", "run", "list",
        "--repo", GH_REPO,
        "--workflow", build_job.get_build_job_name(),
        "--json", "status,conclusion,url,name,createdAt,databaseId,headSha"
    ]
    gh_run_list_file = build_job.get_build_job_file_name()
    fetch_data(gh_run_list_command, gh_run_list_file)
    # result = duckdb.sql(f"SELECT name FROM read_json('{ build_job.get_run_list_file_name() }')").fetchall()
    # return result

# return a number of consecutive failures
def count_consecutive_failures(build_job, con):
    latest_success_rowid = con.execute(f"""
        SELECT rowid
        FROM '{ build_job.get_run_list_table_name() }'
        WHERE conclusion = 'success'
        ORDER BY createdAt DESC
    """).fetchone()
    consecutive_failures = latest_success_rowid[0] if latest_success_rowid else -1 # when -1 then all runs in the json file have conclusion 'failure'
    return consecutive_failures


def sha_matching(short_sha, full_sha, tested_binary, architecture, sha_mismatch_written = False):
    if not full_sha.startswith(short_sha):
        print(f"""
        Version of { tested_binary } tested binary doesn't match to the version that triggered the build.
        - Version triggered the build: { full_sha }
        - Downloaded build version: { short_sha }
        """)
        if not sha_mismatch_written:
            non_matching_sha_file_name = "non_matching_sha_{}_{}.txt".format(tested_binary, architecture.replace("/", "-"))
            with open(non_matching_sha_file_name, 'w') as f:
                f.write(f"""
                Version of { tested_binary } { architecture } tested binary doesn't match to the version that triggered the build.
                - Version triggered the build: { full_sha }
                - Downloaded build version: { short_sha }
                """)
            return False
    print(f"""
    Versions of { tested_binary } build match:
    - Version triggered the build: { full_sha }
    - Downloaded build version: { short_sha }
    """)
    return True
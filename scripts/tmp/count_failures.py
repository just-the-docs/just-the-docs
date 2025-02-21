import duckdb
import argparse
import pandas
import tabulate

# Verifying version
parser = argparse.ArgumentParser()
parser.add_argument("input_file")
parser.add_argument("--jobs")
parser.add_argument("--artifacts")
parser.add_argument("--nightly_build")
args = parser.parse_args()

if not args:
    print("Usage: python scripts/count_consecutive_failures.py <input_file>.json --jobs <nightly-build>.json --artifacts <nightly-build_artifacts>.json \
            --nightly_build <nightly-build>")

input_file = args.input_file
nightly_build = args.nightly_build
jobs = args.jobs
artifacts = args.artifacts

# count consecutive failures
def count_consecutive_failures():
    duckdb.sql(f"""
        CREATE OR REPLACE TABLE gh_run_list AS (
            SELECT *
            FROM '{ input_file }')
            ORDER BY createdAt DESC
    """)
    latest_success_rowid = duckdb.sql(f"""
        SELECT rowid
        FROM gh_run_list
        WHERE conclusion = 'success'
        ORDER BY createdAt DESC
    """).fetchone()
    count_consecutive_failures = latest_success_rowid[0] if latest_success_rowid else -1 # when -1 then all runs in the json file have conclusion 'failure'

    tmp_url = duckdb.sql(f"""
                SELECT
                    url
                FROM gh_run_list
                WHERE conclusion = 'success'
                ORDER BY createdAt DESC
            """).fetchone()
    url = tmp_url[0] if tmp_url else ''

    if count_consecutive_failures == 0:
        with open("build_report_{}.md".format(nightly_build), 'a') as f:
            f.write(f"\n\n### { nightly_build } nightly-build has succeeded.\n")            
            f.write(f"Latest run: [ Run Link ]({ url })\n")
            return
    # since all runs in the json file have conclusion = 'failure', we count them all 
    # and don't include the link to the last successfull run in a report
    if count_consecutive_failures == -1:
        count_consecutive_failures = duckdb.sql(f"""
            SELECT
                count(*)
            FROM gh_run_list
            WHERE conclusion = 'failure'
        """).fetchone()[0]
    
    total_count = duckdb.sql(f"""
        SELECT
            count(*)
        FROM gh_run_list
    """).fetchone()[0]
    
    with open("build_report_{}.md".format(nightly_build), 'w') as f:
        f.write(f"\n\n### { nightly_build } nightly-build has not succeeded the previous **{ count_consecutive_failures }** times.\n")
        if count_consecutive_failures < total_count:
            f.write(f"Latest successfull run: [ Run Link ]({ url })\n")

    with open("build_report_{}.md".format(nightly_build), 'a') as f:
        f.write(f"\n#### Failure Details\n")
        f.write(duckdb.query(f"""
                    SELECT
                        conclusion,
                        createdAt,
                        url
                    FROM gh_run_list
                    WHERE conclusion = 'failure'
                    ORDER BY createdAt DESC
                    LIMIT { count_consecutive_failures }
            """).to_df().to_markdown(index=False)
        )


def create_build_report():
    url= duckdb.sql(f"""SELECT url FROM '{ input_file }'""").fetchone()[0]
    count_consecutive_failures()

    if nightly_build != 'Python':
        duckdb.sql(f"""
            CREATE OR REPLACE TABLE steps AS (
                SELECT * FROM read_json('{ jobs }')
            )
        """)
        duckdb.sql(f"""
                CREATE OR REPLACE TABLE artifacts AS (
                    SELECT * FROM read_json('{ artifacts }')
                );
            """)
        with open("build_report_{}.md".format(nightly_build), 'a') as f:
            f.write(f"\n#### Workflow Artifacts \n")
            # check if the artifatcs table is not empty
            artifacts_count = duckdb.sql(f"SELECT list_count(artifacts) FROM artifacts;").fetchone()[0]
            if artifacts_count > 0:
                f.write(duckdb.query(f"""
                    SELECT
                        t1.job_name AS "Build (Architecture)",
                        t1.conclusion AS "Conclusion",
                        t2.name AS "Artifact",
                        t2.updated_at AS "Uploaded at"
                    FROM (
                        SELECT
                            job_name,
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
                                FROM steps
                                )
                            )
                        WHERE steps['name'] LIKE '%upload%'
                        ORDER BY 
                            conclusion DESC,
                            startedAt
                        ) t1
                    POSITIONAL JOIN (
                        SELECT
                            art.name,
                            art.expires_at expires_at,
                            art.updated_at updated_at
                        FROM (
                            SELECT
                                unnest(artifacts) art
                            FROM artifacts
                            )
                        ORDER BY expires_at
                        ) as t2;
                    """).to_df().to_markdown(index=False)
                )
            else:
                f.write(duckdb.query(f"""
                    SELECT job_name, conclusion 
                    FROM (
                        SELECT unnest(j['steps']) steps, j['name'] job_name, j['conclusion'] conclusion 
                        FROM (
                            SELECT unnest(jobs) j 
                            FROM steps
                            )
                        ) 
                        WHERE steps['name'] LIKE '%upload-artifact%'
                    """).to_df().to_markdown(index=False)
                )
    else:
        with open("build_report_{}.md".format(nightly_build), 'a') as f:
            f.write(f"**{ nightly_build }** run doesn't upload artifacts.\n\n")
    
def main():
    create_build_report()
    
if __name__ == "__main__":
    main()
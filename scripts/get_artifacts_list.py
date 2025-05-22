import argparse
import duckdb
import datetime
import json
import os
import re
import subprocess
from collections import defaultdict
from shared_functions import fetch_data
from shared_functions import get_full_sha
from shared_functions import list_all_runs
from shared_functions import count_consecutive_failures
from shared_functions import BuildJob

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
parser = argparse.ArgumentParser()
parser.add_argument("--file")
args = parser.parse_args()

file = args.file

def main():
    con = duckdb.connect(file)
    result = con.execute(f"""
        select unnest(artifacts)['name'] from 'InvokeCI_artifacts';
    """).fetchall()
    artifacts = ''
    for res in result:
        artifacts += res[0] + '\n'
    # artifacts = [res[0] for res in result]
    with open(f"release-assets.txt", "w") as f:
        f.write(artifacts)
    con.close()
    
if __name__ == "__main__":
    main()

    
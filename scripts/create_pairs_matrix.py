'''
We would like to run benchmarks comparing 
    - `current main` with `a week ago main`, (1)
    - `current version of the latest release` with `a week ago version of the latest release` (2),
    - `current main` with 
        `current version of the latest release` and (3)
        `current version of the previous release` (4)

The script finds latest and previous versions in current heads (`git ls-remote --heads`) and creates last pairs (3), (4) from it.
It takes "new_sha" for `main` and for `latest release` in previous version of json file and creates pairs (1), (2).
It doesn't create pair (2), when there is no "new_sha" for `latest release` in previous version of json file.
In the end it writes pairs to `duckdb_previous_version_pairs.json` file. The file is used to create a matrix for regression tests run.

If there is a `duckdb_curr_version_main.txt` on the machine, it will create 5th pair `curr-main - old-main` with the
SHA from the file and removes that file. So the next time it will be creating 4 unique pairs as described above.

Contents of the `duckdb_previous_version_pairs.json` look like this:
[
    {
        "new_name": "main",
        "new_sha": "latest main SHA",
        "old_name": "main",
        "old_sha": "a week ago main SHA"
    },
    {
        "new_name": "main",
        "new_sha": "latest main SHA",
        "old_name": "v1.2-histrionicus",
        "old_sha": "latest v1.2-histrionicus SHA"
    },
    {
        "new_name": "v1.2-histrionicus",
        "new_sha": "latest v1.2-histrionicus SHA",
        "old_name": "v1.2-histrionicus",
        "old_sha": "a week ago v1.2-histrionicus SHA"
    },
    {
        "new_name": "main",
        "new_sha": "latest main SHA",
        "old_name": "v1.1-eatoni",
        "old_sha": "latest v1.1-eatoni SHA"
    }
]
Names in pairs are starting with "old" and "new" because we use `--old` and `--new` to pass values to the `regression_runner`
'''

import subprocess
import json
import os
import re
from collections import defaultdict

PAIR_FILE = "duckdb_previous_version_pairs.json"
TXT_FILE = "duckdb_curr_version_main.txt"
PARENT_DIR = os.path.dirname(os.getcwd())
PAIRS_FILE_PATH = os.path.join(PARENT_DIR, PAIR_FILE)

def maybe_remove_txt_file():
    txt_file_path = os.path.join(PARENT_DIR, TXT_FILE)
    if os.path.isfile(txt_file_path):
        with open(txt_file_path, "r") as f:
            old_main_sha = f.read()
        os.remove(txt_file_path)
        return old_main_sha

def get_pairs_from_file():
    if os.path.isfile(PAIRS_FILE_PATH):
        with open(PAIRS_FILE_PATH, "r") as f:
            data = f.read()
            if len(data):
                loaded_data = json.loads(data)
                return loaded_data
            else:
                print(f"""
                `duckdb_previous_version_pairs.json` file found in { PARENT_DIR } but it's empty.
                """)
                return None        
    else:
        print(f"""
        `duckdb_previous_version_pairs.json` not found in { PARENT_DIR }.
        A new duckdb_previous_version_pairs.json will be created in a parent directory.
        """)
        return None

def get_branches():
    command = [ "git", "ls-remote", "--heads", "https://github.com/duckdb/duckdb.git" ]
    try:
        branches = subprocess.run(command, capture_output=True).stdout
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: { e.stderr }")
    return branches.decode().splitlines()

def major_minor(version):
    match = re.search(r'v(\d+)\.(\d+)-', version)
    if match:
        major, minor = match.groups()
        return int(major), int(minor)
    else:
        return None

def parse_branches():
    branches_parsed = {}
    branches = get_branches()

    versioned_branches = [version for version in branches if major_minor(version)]
    main_branch = [version for version in branches if 'main' in version][0]
    latest = max(versioned_branches, key=major_minor)
    versioned_branches.remove(latest)
    previous = max(versioned_branches, key=major_minor)
    
    branches_parsed[main_branch.split("/")[-1]] = main_branch.split()[0]
    branches_parsed[latest.split("/")[-1]] = latest.split()[0]
    branches_parsed[previous.split("/")[-1]] = previous.split()[0]
            
    return branches_parsed

def create_pairs_from_old_pairs(old_pairs):
    pairs = []
    parsed_branches = parse_branches()
    branch_names = [br for br in parsed_branches]
    for pair in old_pairs:
        if pair["old_name"] in branch_names[1:]:
            new_pair = {
                "new_name": branch_names[0],
                "new_sha": parsed_branches[branch_names[0]],
                "old_name": pair["old_name"],
                "old_sha": pair["old_sha"]
            }
            pairs.append(new_pair)
        if pair["new_name"] in branch_names and pair["new_name"] == pair["old_name"]:
            new_pair = {
                "new_name": pair["new_name"],
                "new_sha": parsed_branches[pair["new_name"]],
                "old_name": pair["new_name"],
                "old_sha": pair["new_sha"]
            }
            pairs.append(new_pair)
    unique_pairs = [dict(t) for t in {frozenset(item.items()) for item in pairs}]
    return unique_pairs

def create_pairs_from_branches(old_main = ""):
    print(create_pairs_from_branches, old_main)
    pairs = []
    parsed_branches = parse_branches()
    branch_names = [br for br in parsed_branches]
    for branch in branch_names:
        new_pair = {
                "new_name": branch_names[0],
                "new_sha": parsed_branches[branch_names[0]],
                "old_name": branch,
                "old_sha": parsed_branches[branch]
            }
        pairs.append(new_pair)
        if branch in branch_names[:2]:
            new_pair = {
                "new_name": branch,
                "new_sha": parsed_branches[branch],
                "old_name": branch,
                "old_sha": old_main if (branch == 'main' and old_main) else parsed_branches[branch]
            }
            pairs.append(new_pair)
    unique_pairs = [dict(t) for t in {frozenset(item.items()) for item in pairs}]
    return unique_pairs

def main():
    old_txt = maybe_remove_txt_file()
    old_pairs = get_pairs_from_file()
    if old_txt:
        unique_pairs = create_pairs_from_branches(old_txt)
    elif old_pairs:
        unique_pairs = create_pairs_from_old_pairs(old_pairs)
    else:
        unique_pairs = create_pairs_from_branches()
    with open(PAIRS_FILE_PATH, "w") as f:
        json.dump(unique_pairs, f, indent=4)

if __name__ == "__main__":
    main()
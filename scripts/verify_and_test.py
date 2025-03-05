'''
We would like to know if extensions can be installed and loaded on nightly-builds.
Nightly-builds for platforms Windows, OSX, Linux, WASM, Android, R upload artifacts, but we test only
Windows, OSX, Linux platforms binaries.
There are nightly-builds which don't upload artifacts on GitHub: Python, Julia, Swift, SwiftRelease.
Python builds are uploaded to Pypy so Python builds can be tested as well.

This script makes sure that tested version and nightly-build version are the same by comparing their SHA.
Then it runs INSTALL and LOAD statements for each extension. In case of `stderr` in an output, it collects failure
information to a .csv file (later the file will be used to create a report).

A list of extensions comes from the `ext/.github/config/out_of_tree_extensions.cmake` file from `duckdb/duckdb` repo.
Also this script tries to INSTALL a non-existing extension to make sure the whole test results are not false-positive.
'''
import argparse
import docker
import duckdb
import glob
import os
import random
import re
import sys
import subprocess
import textwrap
from shared_functions import fetch_data
from shared_functions import sha_matching
from shared_functions import list_extensions
from verify_python_build import verify_and_test_python_linux

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
ACTIONS = ["INSTALL", "LOAD"]
EXT_WHICH_DOESNT_EXIST = "EXT_WHICH_DOESNT_EXIST"
SHOULD_BE_TESTED = ('python', 'osx', 'linux', 'windows')

parser = argparse.ArgumentParser()
parser.add_argument("--nightly_build")
parser.add_argument("--architecture")
parser.add_argument("--run_id")
parser.add_argument("--runs_on")
parser.add_argument("--branch")

args = parser.parse_args()

nightly_build = args.nightly_build
architecture = args.architecture
run_id = args.run_id
runs_on = args.runs_on # linux-latest
branch = args.branch

def get_full_sha(run_id):
    gh_headSha_command = [
        "gh", "run", "view",
        run_id,
        "--repo", GH_REPO,
        "--json", "headSha",
        "-q", ".headSha"
    ]
    full_sha = subprocess.run(gh_headSha_command, check=True, text=True, capture_output=True).stdout.strip()
    return full_sha

def verify_version(tested_binary, full_sha):
    pragma_version = [ tested_binary, "--version" ]
    short_sha = subprocess.run(pragma_version, text=True, capture_output=True).stdout.strip().split()[-1]
    return sha_matching(short_sha, full_sha, tested_binary, architecture)

def test_extensions(tested_binary, file_name, extensions):
    for ext in extensions:
        select_installed = [
            tested_binary,
            "-csv",
            "-noheader",
            "-c",
            f"SELECT installed FROM duckdb_extensions() WHERE extension_name='{ ext }';"
        ]
        subprocess_result = subprocess.run(select_installed, text=True, capture_output=True)

        is_installed = subprocess_result.stdout.strip()
        if is_installed == 'false':
            for action in ACTIONS:
                print(f"{ action } { ext }...")
                install_ext = [
                    tested_binary,
                    "-c",
                    f"{ action } '{ ext }';"
                ]
                try:
                    subprocess_result = subprocess.run(install_ext, text=True, capture_output=True)
                    if subprocess_result.stderr:
                        print(f"{ action } '{ ext }' had failed with following error:\n{ subprocess_result.stderr.strip() }")
                        actual_result = 'failed'
                    else:
                        actual_result = 'passed'
                    if not os.path.exists(file_name) or os.path.getsize(file_name) == 0:
                        with open(file_name, "w") as f:
                            f.write("nightly_build,architecture,runs_on,version,extension,statement,result\n")
                    with open(file_name, "a") as f:
                        f.write(f"{ nightly_build },{ architecture },{ runs_on },,{ ext },{ action },{ actual_result }\n")

                except subprocess.CalledProcessError as e:
                    print(f"Error running command for extesion { ext }: { e }")
                    print(f"stderr: { e.stderr }")
    print(f"Trying to install a non-existing extension in {nightly_build}...")
    subprocess_result = subprocess.run([ tested_binary, "-c", "INSTALL", f"'{ EXT_WHICH_DOESNT_EXIST }'"], text=True, capture_output=True)
    if subprocess_result.stderr:
        print(f"Attempt to install a non-existing extension resulted with error, as expected: { subprocess_result.stderr }")
    else:
        print(f"Unexpected extension with name { EXT_WHICH_DOESNT_EXIST } had been installed.")
        f.write(f"Unexpected extension with name { EXT_WHICH_DOESNT_EXIST } had been installed.")

def main():
    arch = architecture.replace("/", "-")
    file_name = f"{ branch }_list_failed_ext_{ nightly_build }_{ arch }.csv"
    tested_platforms_file_name = f"{ branch }_tested_platforms{ nightly_build }_{ arch }.csv"

    full_sha = get_full_sha(run_id)
    if branch is 'main':
        extensions = list_extensions()
    else:
        extensions=('arrow' 'autocomplete' 'aws' 'azure' 'delta' 'excel' 'fts' 'httpfs' 'iceberg' 'icu' 'inet' 'jemalloc' 'json' 'motherduck' 'mysql_scanner' 'parquet' 'postgres_scanner' 'shell' 'spatial' 'sqlite_scanner' 'sqlsmith' 'substrait' 'tpcds' 'tpch' 'vss')

    if nightly_build in SHOULD_BE_TESTED:
        if nightly_build == 'python':
            verify_and_test_python_linux(file_name, extensions, nightly_build, run_id, architecture, runs_on, full_sha, tested_platforms_file_name, branch)
        else:
            path_pattern = os.path.join("duckdb_path", "duckdb*")
            matches = glob.glob(path_pattern)
            if matches:
                tested_binary = os.path.abspath(matches[0])
                print(f"Found binary: { tested_binary }")
            else:
                raise FileNotFoundError(f"No binary matching { path_pattern } found in duckdb_path dir.")
            if verify_version(tested_binary, full_sha):
                # write tested platform
                subprocess_result = subprocess.run([ tested_binary, "--csv", "--noheader", "-c", "PRAGMA platform"], text=True, capture_output=True)
                tested_platform = subprocess_result.stdout.strip()
                with open(tested_platforms_file_name, "a") as f:
                    f.write(f"{ nightly_build }_{ architecture },{ tested_platform }\n")
                    print("HERE")
                test_extensions(tested_binary, file_name, extensions)
            else:
                non_matching_sha_file_name = f"{ branch }_non_matching_sha_{ nightly_build }_{ arch }.csv"
                with open(non_matching_sha_file_name, 'a') as f:
                    f.write(f"{ nightly_build }{ version },{ architecture }\n")

if __name__ == "__main__":
    main()
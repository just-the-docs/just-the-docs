import docker
import duckdb
import glob
import os
import re
import sys
import subprocess
import textwrap
from shared_functions import fetch_data
from shared_functions import sha_matching

GH_REPO = os.environ.get('GH_REPO', 'duckdb/duckdb')
ACTIONS = ["INSTALL", "LOAD"]
EXT_WHICH_DOESNT_EXIST = "EXT_WHICH_DOESNT_EXIST"
SHOULD_BE_TESTED = ('python', 'osx', 'linux', 'windows')

def create_container(client, container_name, image, architecture, tested_binary_path):
    container = client.containers.run(
        image=image,
        name=container_name,
        command="/bin/bash -c 'sleep infinity'",
        platform=architecture,
        volumes=tested_binary_path if tested_binary_path else None,
        detach=True
    )
    print(f"Container '{ container_name }' created.")
    return container

def execute_in_container(container, command):
    exec_result = container.exec_run(command, stdout=True, stderr=True)
    print(f"Container '{ container_name }': Command '{ command } execution output:\n{ exec_result .output.decode() }")

def stop_container(container, container_name):
    container.stop()
    container.remove()
    print(f"Container '{ container_name } has stopped.")

def list_builds_for_python_versions(run_id):
    file_name = "python_run_info.md"
    command = [
        "gh", "run", "view",
        "--repo", GH_REPO,
        run_id, "-v"
    ]
    fetch_data(command, file_name)
    with open(file_name, "r") as file:
        content = file.read()
        pattern = r"cp([0-9]+)-.*"
        matches = sorted(set(re.findall(pattern, content)))
        # puts a '.' after the first character: '310' => '3.10'
        result = [word[0] + '.' + word[1:] if len(word) > 1 else word + '.' for word in matches]
        return result

def verify_and_test_python_linux(file_name, extensions, nightly_build, run_id, architecture, runs_on, full_sha):
    python_versions = list_builds_for_python_versions(run_id)
    if runs_on.startswith("ubuntu"):
        sha_mismatch_written = False
        if not sha_mismatch_written:
            for version in python_versions:
                client = docker.from_env() # to use docker installed on GH Actions machine by the workflow
                arch = f"linux/{ architecture }"
                docker_image = f"python:{ version }"
                container_name = f"python-test-{ runs_on }-{ architecture }-python-{ version.replace('.', '-') }"
                container = create_container(client, container_name, docker_image, architecture, None)
                print(f"VERIFYING BUILD SHA FOR python{ version }")
                try:
                    container.exec_run("pip install -v duckdb --pre --upgrade", stdout=True, stderr=True)
                    subprocess_result = container.exec_run(
                        "python -c \"import duckdb; print(duckdb.sql('SELECT source_id FROM pragma_version()').fetchone()[0])\"",
                        stdout=True, stderr=True
                    )
                    print(f"Result: { subprocess_result.output.decode() }")
                    short_sha = subprocess_result.output.decode().strip()
                    if sha_matching(short_sha, full_sha, nightly_build, architecture, sha_mismatch_written) is True:
                        print(f"TESTING EXTENSIONS ON python{ version }")
                        # select_extensions = container.exec_run("""
                        #     python -c "import duckdb; res = duckdb.sql('SELECT extension_name FROM duckdb_extensions() WHERE NOT loaded').fetchall(); result =[row[0] for row in res]; print(result)"
                        # """, stdout=True, stderr=True)
                        # extensions = select_extensions.output.decode()
                        # print(extensions)
                        for extension in extensions:
                            installed = container.exec_run(f"""
                                python -c "import duckdb; res = duckdb.sql('SELECT installed FROM duckdb_extensions() WHERE extension_name=\\'{ extension }\\'').fetchone(); print(res[0] if res else None)"
                                """, stdout=True, stderr=True)
                            print( f"Is { extension } already installed: { installed.output.decode() }")
                            if installed.output.decode().strip() == "False":
                                for action in ACTIONS:
                                    print(f"{ action } { extension }...")
                                    action_result_ouput = container.exec_run(f"""
                                        python -c "import duckdb; print(duckdb.sql('{ action } \\'{ extension }\\''))"
                                    """,
                                    stdout=True, stderr=True).output.decode().strip()
                                    print(f"STDOUT: {action_result_ouput}")
                                    installed = container.exec_run(f"""
                                        python -c "import duckdb; res = duckdb.sql('SELECT installed FROM duckdb_extensions() WHERE extension_name=\\'{ extension }\\'').fetchone(); print(res[0] if res else None)"
                                        """, stdout=True, stderr=True)
                                    print( f"Is { extension } { action }ed: { installed.output.decode() }")
                                    if action_result_ouput != "None":
                                        actual_result = 'failed'
                                    else:
                                        actual_result = 'passed'
                                    if not os.path.exists(file_name) or os.path.getsize(file_name) == 0:
                                        with open(file_name, "w") as f:
                                            f.write("nightly_build,architecture,runs_on,version,extension,statement,result\n")
                                    with open(file_name, "a") as f:
                                        f.write(f"{ nightly_build },{ architecture },{ runs_on },,{ ext },{ action },{ actual_result }\n")
                            else:
                                if not sha_mismatch_written:
                                    sha_mismatch_written = True
                finally:
                    stop_container(container, container_name)
        

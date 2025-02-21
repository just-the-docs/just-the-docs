import requests
import argparse
import json

REPO_OWNER = 'zuleykhapa'
REPO_NAME = 'nbc'
WORKFLOW_FILE = 'Test.yml'
# it's possible to trigger workflow runs like this only on 'main'
REF = 'main'

url = f"https://api.github.com/repos/{ REPO_OWNER }/{ REPO_NAME }/actions/workflows/{ WORKFLOW_FILE }/dispatches"

parser = argparse.ArgumentParser()
parser.add_argument("GH_TOKEN")
parser.add_argument("--inputs")
args = parser.parse_args()
GH_TOKEN = args.GH_TOKEN
loaded_data = args.inputs

with open(loaded_data, "r") as file:
    inputs = json.load(file)

headers = {
    "Authorization": f"Bearer { GH_TOKEN }",
    "Accept": "application/vnd.github.v3_json",
}


for input in inputs:
    if input["failures_count"] == 0:
        nightly_build = input.get("nightly_build")
        platform = input.get("platform")
        architectures = input.get("architectures")
        runs_on = input.get("runs_on")
        run_id = input.get("run_id")

        # "architectures": ",".join(architectures) if isinstance(architectures, list) else architectures,
        payload = {
            "ref": REF,
            "inputs": {
                "nightly_build": nightly_build,
                "platform": platform,
                "architectures": architectures,
                "runs_on": runs_on,
                "run_id": run_id,
            },
        }

        print(f"Triggering workflow for {platform}...")
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 204:
            print("Workflow triggered successfully!")
        else:
            print(f"Failed to trigger workflow: { response.status_code }")
            print(response.json())
# import datetime

# CURR_DATE = datetime.datetime.now().strftime('%Y-%m-%d')
# REPORT_FILE = f"{ CURR_DATE }-report.md"
# print(REPORT_FILE)

import argparse
import json

parser = argparse.ArgumentParser()
# parser.add_argument("inputs")
# args = parser.parse_args()
# loaded_data = args.inputs

# with open(loaded_data, "r") as file:
#     inputs = json.load(file)

# for input in inputs:
#     print("start")
#     print(input)
#     print("end")

# import duckdb
# con = duckdb.connect()

# con.execute(f"""
#         CREATE TABLE temp_json AS
#             SELECT
#                 *
#             FROM
#                 read_json(
#                     '/Users/zuleykhapavlichenkova/Downloads/leads_stage.json',
#                     records='auto'
#                 )
#             ;
#     """)
# result = con.execute("SELECT * FROM temp_json").fetchall()

# for row in result:
#     print(row)

# import re

# parser.add_argument("file")
# args = parser.parse_args()
# file = args.file

# def get_python_versions_from_run(file):
#     with open(file, "r") as file:
#         content = file.read()
#         pattern = r"cp([0-9]+)-.*"
#         matches = sorted(set(re.findall(pattern, content)))
#         # puts a '.' after the first character: '310' => '3.10'
#         result = [word[0] + '.' + word[1:] if len(word) > 1 else word + '.' for word in matches]
#         print(result)

def main():
    file_name = "list_failed_ext_{}_{}.md".format("one", "two/three".replace("/", "_"))
    with open(file_name, 'a') as f:
        f.write("🦑🦑🦑🦑🦑🦑🦑")
    # get_python_versions_from_run(file)

if __name__ == "__main__":
    main()
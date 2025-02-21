import duckdb
import argparse
import pandas
import tabulate
import sys

parser = argparse.ArgumentParser()
parser.add_argument("input_csv")
parser.add_argument("--platform")
args = parser.parse_args()
if not args:
    print("SET input_csv argument")

input_csv = args.input_csv
platform = args.platform
def prepare_report():
    if platform == 'Python':
        select_list = 'architecture, version, extension'
    else:
        select_list = 'architecture, extension'
    with open("failed_extensions_{}.md".format(platform), 'w') as f:
        f.write(f"\n\n#### Extensions failed to INSTALL\n")
        f.write(duckdb.query(f"""
                    SELECT { select_list }
                    FROM read_csv("{ input_csv }")
                    WHERE failed_statement = 'INSTALL' 
                    ORDER BY nightly_build, architecture, runs_on, version, extension, failed_statement
                    """).to_df().to_markdown(index=False)
        )
        f.write(f"\n\n#### Extensions failed to LOAD\n")
        f.write(duckdb.query(f"""
                    SELECT { select_list }
                    FROM read_csv("{ input_csv }")
                    WHERE failed_statement = 'LOAD' 
                    ORDER BY nightly_build, architecture, runs_on, version, extension, failed_statement
                    """).to_df().to_markdown(index=False)
        )

def main():
    prepare_report()

if __name__ == "__main__":
    main()

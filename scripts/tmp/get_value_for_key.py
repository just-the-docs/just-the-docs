import duckdb
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("nightly_build")
parser.add_argument("--key")

args = parser.parse_args()
if not args:
    sys.stderr.write("Usage: python scripts/get_value.py <nightly_build> --key <key>")
    sys.exit(1)

nightly_build = args.nightly_build
key = args.key

value = duckdb.sql(f"""
    SELECT { key } 
    FROM read_json('{ nightly_build }') 
    WHERE status = 'completed' 
    ORDER BY createdAt 
    DESC LIMIT 1;
    """).fetchone()[0]
print(value)
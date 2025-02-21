#!/bin/bash

release_v="v1.2.0"
sha="5d02d69e5c"
scope=("duckdb-extensions" "duckdb-community-extensions")
platforms=("linux_amd64" "linux_amd64_gcc4" "linux_amd64_musl" "linux_arm64" "linux_arm64_gcc4" "osx_amd64" "osx_arm64" "windows_amd64" "windows_amd64_mingw")
extensions=('arrow' 'autocomplete' 'aws' 'azure' 'delta' 'excel' 'fts' 'httpfs' 'iceberg' 'icu' 'inet' 'jemalloc' 'json' 'motherduck' 'mysql_scanner' 'parquet' 'postgres_scanner' 'shell' 'spatial' 'sqlite_scanner' 'sqlsmith' 'substrait' 'tpcds' 'tpch' 'vss')

for platform in ${platforms[@]}; do
    for extension in ${extensions[@]}; do
        wget -q https://duckdb-extensions.s3.us-east-2.amazonaws.com/${release_v}/${platform}/${extension}.duckdb_extension.gz
        gzip -d ${extension}.duckdb_extension.gz
        hexdump -C ${extension}.duckdb_extension | tail -n 30 | awk -F'|' '{print $2}' | tr -d '\n' > ${extension}-${sha}-${platform}.txt
        if (cat ${extension}-${sha}-${platform}.txt | grep -o $release_v); then
            echo "${extension},${sha},${platform},passed"
            echo "${extension},${sha},${platform},passed" >> log.csv
        else
            echo "${extension},${sha},${platform},failed"
            echo "${extension},${sha},${platform},failed" >> log.csv
        fi
        rm ${extension}.duckdb_extension
        rm ${extension}-${sha}-${platform}.txt
    done
done
#!/bin/sh

echo "Packaging gem... \n"
gem build just-the-docs.gemspec

echo "Cleaning up... \n"
git add *.gem
git commit -m 'Bump just-the-docs gem package'

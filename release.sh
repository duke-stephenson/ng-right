#!/usr/bin/env bash

set -e

msg=${1:-"release package"}
type=${2:-"patch"}

script="grunt conventionalChangelog"

git hf build npm -t "$type" -s "$script" -m "$msg"

grunt
npm publish

#!/usr/bin/env bash

set -e

msg=$1
type=$2

script="grunt conventionalChangelog"

git hf build npm -t "$type" -s "$script" -m "$msg"

grunt
npm publish

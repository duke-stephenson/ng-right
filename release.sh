#!/usr/bin/env bash

set -e

type_arg=$1
type=${type_arg:-"patch"}

version=$(grunt bump-only:${type} --dry-run 2>&1 | grep "(in bower" | cut -d " " -f 6)

git hf release start ${version}

grunt bump-only:${type} &>/dev/null
echo ""

grunt

git commit --all -m "feat(release): build release $version"

grunt conventionalChangelog

git commit --all -m "chore(release): bump and changelog"

git hf release finish -M

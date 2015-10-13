#!/usr/bin/env bash

set -e

cmd_install () {
    npm install -g npm
    npm install -g "gulpjs/gulp-cli#4.0"
    npm install --save-dev
    npm install -g tsd
    tsd install
}

cmd_script () {
    npm test
}

cmd_before_deploy () {
    gulp
}

cmd_release () {
    msg=${1:-"release package"}
    type=${2:-"patch"}
    script="gulp changelog"
    git hf build npm -t "$type" -s "$script" -m "$msg"
}

cmd_local () {
  cmd_before_deploy
  cmd_release "ci skip"
  npm publish
}

cmd="${1:-release}"
echo "Run cmd $cmd"

case "$cmd" in

    install)
        cmd_install
        exit ;;

    script)
        cmd_script
        exit ;;

    before_deploy)
        cmd_before_deploy
        exit ;;

    local)
        cmd_local
        exit ;;

    run)
        cmd_install
        cmd_script
        cmd_before_deploy
        exit ;;

    *)
        cmd_release "$1" "$2"
        exit ;;
esac

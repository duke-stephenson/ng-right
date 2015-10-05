#!/usr/bin/env bash

set -e

cmd_install () {
    npm install -g grunt grunt-cli
    npm install --save-dev
    npm install -g tsd
    tsd install
}

cmd_script () {
    npm test
}

cmd_before_deploy () {
    grunt
}

cmd_release () {
    msg=${1:-"release package"}
    type=${2:-"patch"}
    script="grunt conventionalChangelog"
    git hf build npm -t "$type" -s "$script" -m "$msg"
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

    run)
        cmd_install
        cmd_script
        cmd_before_deploy
        exit ;;

    *)
        cmd_release "$1" "$2"
        exit ;;
esac

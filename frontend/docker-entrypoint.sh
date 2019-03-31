#!/bin/sh
set -e

light-server -s . -p 7777 --historyindex '/index.html' -x $ENTRYPOINT --proxypath $PROXY_PATH --no-reload

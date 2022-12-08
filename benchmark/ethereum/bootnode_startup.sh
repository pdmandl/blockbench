#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

bootnode -genkey boot.key
sudo kill -9 `sudo lsof -t -i:30310`
bootnode -nodekey boot.key -verbosity 9 -addr :30310
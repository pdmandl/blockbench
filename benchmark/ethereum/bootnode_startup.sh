#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

bootnode -genkey boot.key
sudo kill -9 `sudo lsof -t -i:30310` 2>/dev/null
IP_ADDR_EXT=`(ip -4 addr | grep -oP '(?<=inet\s)\d+(\.\d+){3}') | cut -f2 -d$'\n'`
bootnode -nodekey boot.key -verbosity 9 -addr $IP_ADDR_EXT:30310
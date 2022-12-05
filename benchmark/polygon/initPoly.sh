#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

polygon-edge secrets init --data-dir $ETH_DATA > secrets.txt
IP_ADDR_EXT=`(ip -4 addr | grep -oP '(?<=inet\s)\d+(\.\d+){3}') | cut -f2 -d$'\n'`
python3 $ETH_HOME/prepareSecrets.py $IP_ADDR_EXT

polygon-edge secrets output --data-dir
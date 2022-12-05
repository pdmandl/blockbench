#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

polygon-edge secrets init --data-dir $ETH_DATA > secrets.txt
python3 $ETH_HOME/prepareSecrets.py


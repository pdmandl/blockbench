#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

echo "$1"
IP_ADDR_EXT=`(ip -4 addr | grep -oP '(?<=inet\s)\d+(\.\d+){3}') | cut -f2 -d$'\n'`
polygon-edge server --data-dir $ETH_DATA --chain genesis.json  --libp2p 0.0.0.0:1478 --nat $IP_ADDR_EXT --seal > $ETH_DATA/../eth_log 2>&1 & 
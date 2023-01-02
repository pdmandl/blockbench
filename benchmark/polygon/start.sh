#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

IP_ADDR_EXT=`(ip -4 addr | grep -oP '(?<=inet\s)\d+(\.\d+){3}') | cut -f2 -d$'\n'`
sudo kill -9 `sudo lsof -t -i:1478`
sudo kill -9 `sudo lsof -t -i:8545`
polygon-edge server --data-dir $ETH_DATA --max-enqueued 10240 --block-time 4 --block-gas-target 0x32000000 --chain genesis.json  --libp2p 0.0.0.0:1478 --nat $IP_ADDR_EXT --seal > /home/ubuntu/eth_log 2>&1 & 
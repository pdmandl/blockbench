#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

IP_ADDR_EXT=`(ip -4 addr | grep -oP '(?<=inet\s)\d+(\.\d+){3}') | cut -f2 -d$'\n'`
nohup geth --datadir $ETH_DATA --bootnodes $(cat $ETH_HOME/bootnode.txt | tr -d '"') --nodiscover --http --http.addr $IP_ADDR_EXT  --http.port 8051 --http.corsdomain "*" --rpc.gascap 0 --maxpeers 32 --networkid 1 --nat extip:$IP_ADDR_EXT --unlock 0 --allow-insecure-unlock --password <(echo -n "${PWD}") --mine --miner.threads 2 > $ETH_DATA/../eth_log 2>&1 &


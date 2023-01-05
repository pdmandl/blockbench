#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
for client in `cat $CLIENTS`; do
  if [[ $i -lt $1 ]]; then
    #$1 is the number of nodes
    #$2 is the private key file to import for use in geth
    scp -oStrictHostKeyChecking=no $USER@$client:$ETH_HOME/Transactions_$4tps_500tts.xlsx $ETH_HOME_LOCAL/Transactions_$2_$4tps_500tts_$client.xlsx
    echo done node $host
  fi
  let i=$i+1
done

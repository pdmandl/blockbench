#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/polySetup.sh
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/initPoly.sh > secrets.txt
    echo done node $host
  fi
  let i=$i+1
done

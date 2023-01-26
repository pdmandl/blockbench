#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/install.sh 
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/install.sh
    echo done node $i at $host
  fi
  let i=$i+1
done

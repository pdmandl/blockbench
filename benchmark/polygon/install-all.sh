#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
rm secrets.txt
rm multi.txt
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/polySetup.sh
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/polySetup.sh
  fi 
done
#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
echo $HOSTS
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    #$1 is the number of nodes
    #$2 is the private key file to import for use in geth
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/install.sh 
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/install.sh
    echo done node $host
  fi
  let i=$i+1
done

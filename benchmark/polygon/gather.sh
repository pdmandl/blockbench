#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

command="polygon-edge genesis --consensus ibft"
for row in `cat $MULTI`; do
  command="${command} --ibft-validator ${row}"
done
for secret in `cat $SECRETS`; do
  command="${command} --bootnode ${secret}"
done
echo $command
for host in `cat $HOSTS`; do
  ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/start.sh
  ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/start.sh "$command" 
done

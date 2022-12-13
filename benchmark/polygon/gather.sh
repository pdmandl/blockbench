#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

1: command="polygon-edge genesis --premine 0x4873a45c059E564a7E091A4D4f558c63F49F1136:100000000000000000000000 --consensus ibft"
1: for row in `cat $MULTI`; do
1:   command="${command} --ibft-validator ${row}"
1: done
1: for secret in `cat $SECRETS`; do
1:   command="${command} --bootnode ${secret}"
1: done
1: echo $command
1: for host in `cat $HOSTS`; do
1:   ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/start.sh
1:   ssh -oStrictHostKeyChecking=no $USER@$host rm -rf $ETH_HOME/genesis.json
1:   ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && $command"
1:   ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && polygon-edge genesis predeploy --chain ./genesis.json --artifacts-path ./Storage.json --predeploy-address 0x01111" 
1:   ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/start.sh
1: done

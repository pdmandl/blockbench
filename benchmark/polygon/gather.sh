#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

command="polygon-edge genesis --pos --consensus ibft --premine 0x4873a45c059E564a7E091A4D4f558c63F49F1136:100000000000000000000000"
for row in `cat $MULTI`; do
  command="${command} --ibft-validator ${row}"
done
for secret in `cat $SECRETS`; do
  command="${command} --bootnode ${secret}"
done
for host in `cat $HOSTS`; do
  ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/start.sh
  ssh -oStrictHostKeyChecking=no $USER@$host rm -rf $ETH_HOME/genesis.json
  ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && $command"
  ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && polygon-edge genesis predeploy --chain genesis.json --artifacts-path SmallBank.json --predeploy-address '0x01110'"
  ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && polygon-edge genesis predeploy --chain genesis.json --artifacts-path KVstore.json --predeploy-address '0x01111'"
  ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/start.sh
done

#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

command="polygon-edge genesis --pos true --consensus ibft --premine 0xA13c10C0D5bd6f79041B9835c63f91de35A15883:100000000000000000000000 --premine 0x36615Cf349d7F6344891B1e7CA7C72883F5dc049:100000000000000000000000 --premine 0xa61464658AfeAf65CccaaFD3a512b69A83B77618:100000000000000000000000 --premine 0x0D43eB5B8a47bA8900d84AA36656c92024e9772e:100000000000000000000000"
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
  ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && polygon-edge genesis predeploy --chain genesis.json --artifacts-path NftMint.json --predeploy-address '0x01112'"
  ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/start.sh
done

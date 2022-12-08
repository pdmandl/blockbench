#!/bin/bash
#nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

rm -rf addPeer.txt
rm -rf bootnode.txt
./gather.sh $1
sleep 3
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    echo start mining on node $host
    scp -oStrictHostKeyChecking=no $ETH_HOME_LOCAL/addPeer.txt $USER@$host:$ETH_HOME
    scp -oStrictHostKeyChecking=no $ETH_HOME_LOCAL/bootnode.txt $USER@$host:$ETH_HOME
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/addPeer.txt
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/bootnode.txt
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/start-mining.sh
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/start-mining.sh $PEERS $BOOTNODE
    echo done node $host
  fi
  let i=$i+1
done

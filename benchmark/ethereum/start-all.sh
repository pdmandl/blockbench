#!/bin/bash
#nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

rm -rf addPeer.txt
rm -rf static-nodes.json
rm -rf bootnode.txt
./gatherStatic.sh $1
sleep 3
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    echo start mining on node $host
    #scp -oStrictHostKeyChecking=no $ETH_HOME_LOCAL/addPeer.txt $USER@$host:$ETH_HOME
    #scp -oStrictHostKeyChecking=no $ETH_HOME_LOCAL/bootnode.txt $USER@$host:$ETH_HOME
    scp -oStrictHostKeyChecking=no $ETH_HOME_LOCAL/static-nodes.json $USER@$host:$ETH_DATA/geth
    #ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/addPeer.txt
    #ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/bootnode.txt
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/start-mining.sh
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_DATA/static-nodes.json
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/start-mining.sh
    echo done node $host
  fi
  let i=$i+1
done

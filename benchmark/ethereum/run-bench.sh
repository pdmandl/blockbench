#!/bin/bash
#arg num_nodes #num_threads num_clients tx_rate [-drop]
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

./stop-all.sh $1 

#enable if you want installation in runtime
#./install-all $1

./init-all.sh $1 
./start-all.sh $1 

let M=40
echo "Sleeping $M seconds to allow network to bootstrap"
sleep $M
./start-multi-clients.sh $3 $1 $2 $4

./stop-all.sh $1

sleep 5


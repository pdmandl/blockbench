#!/bin/bash
#arg num_nodes #num_threads num_clients tx_rate [-drop]
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

./stop-all.sh $1 

./init-all.sh $1 
./start-all.sh $1 

echo "Sleeping $5 seconds to allow network to bootstrap"
sleep $5
./start-multi-clients.sh $3 $1 $2 $4 $6

sleep 5

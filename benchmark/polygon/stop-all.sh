#!/bin/bash
#arg nnodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
for host in `cat $CLIENTS`; do
    ssh -oStrictHostKeyChecking=no $USER@$host  killall -KILL node 
    echo stopped client $host
done

for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    ssh -oStrictHostKeyChecking=no $USER@$host sudo chmod 755 $ETH_HOME/stop.sh 
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/stop.sh
    echo stopped host $host
  fi
  let i=$i+1
done



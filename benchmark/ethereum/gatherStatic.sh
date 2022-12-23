#!/bin/bash
#nnodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh 

i=0
echo "starting gathering"
echo "[" >> static-nodes.json
for host in `cat $HOSTS`; do
  if [[ $i -lt 1 ]]; then
    echo "starting gathering boot"
    ssh $USER@$host chmod 755 $ETH_HOME/bootnode_startup.sh
    ssh $USER@$host nohup $ETH_HOME/bootnode_startup.sh | head -n 1 > bootnode.txt
  fi
  if [[ $i -lt $1 ]]; then
    echo "adding peer to network, rpcport $RPCPORT"
    ssh $USER@$host chmod 755 $ETH_HOME/enode.sh
    if [[ $i -lt `expr $1 - 1` ]]; then
      echo "`ssh $USER@$host $ETH_HOME/enode.sh $host 2>/dev/null | grep enode`," >> static-nodes.json
    else 
      echo "`ssh $USER@$host $ETH_HOME/enode.sh $host 2>/dev/null | grep enode`" >> static-nodes.json
    fi
    sleep 1
  fi
  let i=$i+1
  echo $i
done
echo "]" >> static-nodes.json

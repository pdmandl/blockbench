#!/bin/bash
#nnodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh 

i=0
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    echo "adding peer to network, rpcport $RPCPORT"
    ssh $USER@$host chmod 755 $ETH_HOME/enode.sh
    echo "'admin.addPeer(` ssh $USER@$host $ETH_HOME/enode.sh $host 2>/dev/null | grep enode`)'" >> addPeer.txt
    echo -n `ssh $USER@$host $ETH_HOME/enode.sh $host 2>/dev/null | grep enode`, >> bootnode.txt
    sleep 1
   sed -i '$ s/.$//' bootnode.txt
  fi
  let i=$i+1
  echo $i
done

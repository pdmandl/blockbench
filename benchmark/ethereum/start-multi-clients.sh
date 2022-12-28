#!/bin/bash
#num_clients num_nodes threads tx_rate [-drop]
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

let i=0
let IDX=$1  #/2 #$1 is #clients, we take only half of them 
echo starting clients
for host in `cat $HOSTS`; do
  if [[ $i -lt 1 ]]; then
    echo deploying contracts on chain
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && truffle compile && rm Output.txt && truffle migrate --reset --network=private"
    scp -oStrictHostKeyChecking=no $USER@$host:$ETH_HOME/Output.txt $ETH_HOME_LOCAL/Output.txt 
  fi
  let i=$i+1
done
let j=0
for client in `cat $CLIENTS`; do
  if [[ $j -lt $1 ]]; then
    for out in `cat $ETH_HOME/Output.txt`; do
      echo $out
    done
    echo starting client $client  threads=$3 clientNo=$i nservers=$2 txrate=$4
    ssh -oStrictHostKeyChecking=no $USER@$client chmod 755 $ETH_HOME/start-clients.sh
    ssh -oStrictHostKeyChecking=no $USER@$client $ETH_HOME/start-clients.sh $3 $i $2 $4 
  fi
  let j=$j+1
done

if [[ $5 == "-drop" ]]; then
  let M=$2*10+240
  let SR=$M-150
  sleep 250 
  let idx=$2-4
  let i=0
  for server in `cat $HOSTS`; do
    if [[ $i -ge $idx ]]; then
      ssh -oStrictHostKeyChecking=no $USER@$server killall -KILL geth peer java 
      echo "Dropped "$server
    fi
    let i=$i+1
  done
  sleep $SR
  for client in `cat $CLIENTS`; do
    echo $client index $i
    ssh -oStrictHostKeyChecking=no $USER@$client 'killall -KILL driver' 
    let i=$i+1
  done
else
  let M=$2*10+320
  echo "sleeping $M seconds before killing drivers (clients)"
  sleep $M
  for client in `cat $CLIENTS`; do
    echo killing client $client
    ssh -oStrictHostKeyChecking=no $USER@$client 'killall -KILL driver' 
    let i=$i+1
  done
fi

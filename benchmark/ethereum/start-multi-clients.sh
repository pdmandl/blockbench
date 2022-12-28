#!/bin/bash
#num_clients num_nodes threads tx_rate [-drop]
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

let i=0
let IDX=$1 #$1 is #clients, we take only half of them 
echo starting clients
for host in `cat $HOSTS`; do
  if [[ $i -lt 1 ]]; then
    echo deploying contracts on chain
    #sed -i ".bak" sed -i "4s/.*/const rpc = $host;/" truffle-config.js 
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && truffle compile && rm Output.txt && truffle migrate --reset --network=private"
    scp -oStrictHostKeyChecking=no $USER@$host:$ETH_HOME/Output.txt $ETH_HOME_LOCAL/Output.txt 
  fi
  let i=$i+1
done
let j=0
array=($(cat $HOSTS))
for client in `cat $CLIENTS`; do
  if [[ $j -lt $1 ]]; then
    echo starting client $client  threads=$3 clientNo=$i nservers=$2 txrate=$4
    let z=0
    for out in `cat $ETH_HOME_LOCAL/Output.txt`; do
      if [[ "$BENCHMARK" = "ycsb" ]]; then
        if [[ $z -eq 0 ]]; then
          ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && node polyKvStore.js 0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110 http://${array[j]} 10 100 $out" > "${client}"_kv.txt
          echo host: "${array[j]}" contract: $out
        fi
      fi
      if [[ "$BENCHMARK" = "smallbank" ]]; then
        if [[ $z -eq 1 ]]; then
          ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && node polyKvStore.js 0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110 http://${array[j]} 10 100 $out" > "${client}"_sb.txt
          echo host: "${array[j]}" contract: $out
        fi
      fi  
      if [[ "$BENCHMARK" = "nft" ]]; then
        if [[ $z -eq 2 ]]; then
          echo dritter: $out
        fi
      fi  
      let z=$z+1
    done
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

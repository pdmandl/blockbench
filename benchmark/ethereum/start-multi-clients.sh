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
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && rm Output.txt"
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && npm install @openzeppelin/contracts@4.3.0 && npm install @truffle/hdwallet-provider && truffle compile && truffle migrate --reset --network=private"
    scp -oStrictHostKeyChecking=no $USER@$host:$ETH_HOME/Output.txt $ETH_HOME_LOCAL/Output.txt 
  fi
  let i=$i+1
done
j=0
array=($(cat $HOSTS_PRIV))
wallets=($(cat $RICH_WALLETS))
addresses=($(cat $ADDRESSES))
contracts=($(cat $ETH_HOME_LOCAL/Output.txt))
for client in `cat $CLIENTS`; do
  if [[ $j -lt $1 ]]; then
    echo starting client $client  threads=$3 clientNo=$i nservers=$2 txrate=$4
    ssh -oStrictHostKeyChecking=no $USER@$client rm $ETH_HOME/Transactions_$4tps_500tts.xlsx
      if [[ "$BENCHMARK" = "ycsb" ]]; then
          rm "${client}"_kv.txt
          nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && node ethKvStore.js ${wallets[j]} http://${array[j]}:8051 $4 500 ${contracts[0]} $j $1" > "${client}"_kv.txt &
          echo host: "${array[j]}" contract: $out
      fi
      if [[ "$BENCHMARK" = "smallbank" ]]; then
          rm "${client}"_sb.txt
          nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && node ethSmallBank.js ${wallets[j]} http://${array[j]}:8051 $4 500 ${contracts[0]} ${addresses[j]}" > "${client}"_sb.txt &
          echo host: "${array[j]}" contract: $out
      fi  
      if [[ "$BENCHMARK" = "nft" ]]; then
          nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && node ethNftMint.js ${wallets[j]} http://${array[j]}:8051 $4 500 ${contracts[0]} ${addresses[j]}" > "${client}"_nft.txt &
          echo host: "${array[j]}" contract: $out
      fi  
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
  let M=$2*120
  echo "sleeping $M seconds before killing drivers (clients) and retrieving xls files"
  sleep $M
  for client in `cat $CLIENTS`; do
    echo killing client $client
    scp -oStrictHostKeyChecking=no $USER@$client:$ETH_HOME/Transactions_$4tps_500tts.xlsx $ETH_HOME_LOCAL/Transactions_$2_$4tps_500tts_$client.xlsx
    ssh -oStrictHostKeyChecking=no $USER@$client 'killall -KILL driver' 
    let i=$i+1
  done
fi

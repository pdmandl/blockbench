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
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && rm Output.txt"
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && npm install" 
    echo installations done
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && npx hardhat compile"
    echo compilation done
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && npx hardhat run scripts/deploy.js --network zkSyncTestnet"
    echo deployment done
    scp -oStrictHostKeyChecking=no $USER@$host:$ETH_HOME/Output.txt $ETH_HOME_LOCAL/Output.txt 
  fi
  let i=$i+1
done
j=0
array=($(cat $HOSTS_PRIV))
wallets=($(cat $RICH_WALLETS))
addresses=($(cat $ADDRESSES))
contracts=($(cat $ETH_HOME_LOCAL/Output.txt))
let t=$2*60*1000
for client in `cat $CLIENTS`; do
  if [[ $j -lt $1 ]]; then
    echo starting client $client  threads=$3 clientNo=$j nservers=$2 txrate=$4
      if [[ "$BENCHMARK" = "ycsb" ]]; then
          rm "${client}"_kv.txt
          nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install @ethersproject/experimental ethers exceljs zksync-web3 && node zkKvStore.js ${wallets[j]} http://${array[0]} $4 500 ${contracts[0]} $j $1 $t" > "${client}"_kv.txt &
          echo host: "${array[j]}" contract: $out
      fi
      if [[ "$BENCHMARK" = "smallbank" ]]; then
          rm "${client}"_sb.txt
          nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install @ethersproject/experimental ethers exceljs zksync-web3 && node zkSmallBank.js ${wallets[j]} http://${array[0]} $4 500 ${contracts[0]} ${addresses[j]}" > "${client}"_sb.txt &
          echo host: "${array[j]}" contract: $out
      fi  
      if [[ "$BENCHMARK" = "nft" ]]; then
          rm "${client}"_nft.txt
          nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install @ethersproject/experimental ethers exceljs zksync-web3 && node zkNftMint.js ${wallets[j]} http://${array[0]} $4 500 ${contracts[0]} ${addresses[j]}" > "${client}"_sb.txt &
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
  let M=$2*60+60
  echo "sleeping $M seconds before killing drivers (clients) and retrieving xls files"
  sleep $M
  for client in `cat $CLIENTS`; do
    echo killing client $client
    scp -oStrictHostKeyChecking=no $USER@$client:$ETH_HOME/Transactions_$4tps_500tts.xlsx $ETH_HOME_LOCAL/Transactions_$2_$4tps_500tts_$client.xlsx
    ssh -oStrictHostKeyChecking=no $USER@$client 'killall -KILL node' 
    let i=$i+1
  done
fi

#!/bin/bash
#num_clients num_nodes threads tx_rate [-drop]
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

let IDX=$1 #$1 is #clients, we take only half of them 
echo starting clients
j=0
array=($(cat $HOSTS_PRIV))
wallets=($(cat $RICH_WALLETS))
addresses=($(cat $ADDRESSES))
for client in `cat $CLIENTS`; do
  if [[ $j -lt $1 ]]; then
    echo starting client $client  threads=$3 clientNo=$j nservers=$2 txrate=$4
    if [[ "$BENCHMARK" = "ycsb" ]]; then
        rm "${client}"_kv.txt
        echo $4
        nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && node polyKvStore.js ${wallets[j]} http://${array[j]}:8545 $4 500 0x0000000000000000000000000000000000001111 $j $1" > "${client}"_kv.txt &
        echo host: "${array[j]}" contract: 0x0000000000000000000000000000000000001111
    fi
    if [[ "$BENCHMARK" = "smallbank" ]]; then
        nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && node polySmallBank.js ${wallets[j]} http://${array[j]}:8545 $4 500 0x0000000000000000000000000000000000001110 ${addresses[j]}" > "${client}"_sb.txt &
        echo host: "${array[j]}" contract: 0x0000000000000000000000000000000000001110
    fi  
    if [[ "$BENCHMARK" = "nft" ]]; then
        nohup ssh -oStrictHostKeyChecking=no $USER@$client "cd $ETH_HOME && sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && node polyNftMint.js ${wallets[j]} http://${array[j]}:8545 $4 500 0x0000000000000000000000000000000000001112 ${addresses[j]}" > "${client}"_nft.txt &
        echo host: "${array[j]}" contract: 0x0000000000000000000000000000000000001112
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
  let M=$2*25
  echo "sleeping $M seconds before killing drivers (clients) and retrieving xls files"
  sleep $M
  for client in `cat $CLIENTS`; do
    echo killing client $client
    scp -oStrictHostKeyChecking=no $USER@$client:$ETH_HOME/Transactions_$4tps_500tts.xlsx $ETH_HOME_LOCAL/Transactions_$4tps_500tts_$client.xlsx
    ssh -oStrictHostKeyChecking=no $USER@$client 'killall -KILL node' 
    let i=$i+1
  done
fi


for host in `cat $HOSTS`; do
  if [[ $i -lt 1 ]]; then
    echo deploying contracts on chain
    #sed -i ".bak" sed -i "4s/.*/const rpc = $host;/" truffle-config.js 
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && rm Output.txt"
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && truffle compile && truffle migrate --reset --network=private"
    scp -oStrictHostKeyChecking=no $USER@$host:$ETH_HOME/Output.txt $ETH_HOME_LOCAL/Output.txt 
  fi
  let i=$i+1
done
#!/bin/bash
# num_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
rm secrets.txt
rm multi.txt
for host in `cat $HOSTS`; do
  if [[ $i -lt $1 ]]; then
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/polySetup.sh
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/initPoly.sh
    ssh -oStrictHostKeyChecking=no $USER@$host chmod 755 $ETH_HOME/prepareMultiAddress.py
    #enable if you want installation of polygon relevant tools
    #ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/polySetup.sh
    ssh -oStrictHostKeyChecking=no $USER@$host $ETH_HOME/initPoly.sh >> secrets.txt
    ssh -oStrictHostKeyChecking=no $USER@$host "cd $ETH_HOME && python3 prepareMultiAddress.py" >> multi.txt
    echo done node $host
  fi
  let i=$i+1
done

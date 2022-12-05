#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

polygon-edge secrets init --data-dir $ETH_DATA > secrets.txt
i=0
pubKey=""
blsPubKey=""
nodeId=""
cat secrets.txt | while read line 
do
    let i=$i+1
    if [[ $i -eq 3]]; then
      echo $i ':' $line
      echo TIME
    fi        
done

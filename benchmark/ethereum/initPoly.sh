#!/bin/bash
#args: number_of_nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

polygon-edge secrets init --data-dir $ETH_DATA > secrets.txt
i=0
cat secrets.txt | while read line 
do
    let i=$i+1
    echo $i ':' $line
done

#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

killall -KILL geth
killall -KILL polygon-edge
sudo docker stop postgres
sudo docker stop matterlabs/local-node
sudo docker stop matterlabs/geth
rm -rf $ETH_DATA
rm -rf ~/.eth*

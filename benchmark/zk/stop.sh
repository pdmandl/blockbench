#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

killall -KILL geth
killall -KILL polygon-edge
sudo docker kill $(docker ps -q)
rm -rf $ETH_DATA
rm -rf ~/.eth*

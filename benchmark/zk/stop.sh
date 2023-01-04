#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

killall -KILL geth
killall -KILL polygon-edge
docker stop postgres
docker stop matterlabs/local-node
docker stop matterlabs/geth
rm -rf $ETH_DATA
rm -rf ~/.eth*

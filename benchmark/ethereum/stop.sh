#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

killall -KILL geth
killall -KILL node
killall -KILL polygon-e
rm -rf $ETH_DATA
rm -rf ~/.eth*

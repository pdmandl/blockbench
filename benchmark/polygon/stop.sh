#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

killall -KILL polygon-edge
rm -rf $ETH_DATA
rm -rf ~/.eth*

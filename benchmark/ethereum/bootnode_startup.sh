#!/bin/bash
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

bootnode -genkey boot.key
bootnode -nodekey boot.key -verbosity 9 -addr :30310
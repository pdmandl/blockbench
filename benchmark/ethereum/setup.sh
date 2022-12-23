#!/bin/bash
#arg nnodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
for host in `cat $HOSTS`; do
  ssh -oStrictHostKeyChecking=no $USER@$host "rm -rf blockbench && git clone ${GIT_REPO}"
  echo done node $host
done
for host in `cat $CLIENTS`; do
  ssh -oStrictHostKeyChecking=no $USER@$host "rm -rf blockbench && git clone ${GIT_REPO}"
  echo done node $host
done



#!/bin/bash
#arg nnodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

i=0
for host in `cat $HOSTS`; do
  ssh -oStrictHostKeyChecking=no $USER@$host git config --global user.email $GIT_USER_MAIL
  ssh -oStrictHostKeyChecking=no $USER@$host git config --global user.name $GIT_USER
  ssh -oStrictHostKeyChecking=no $USER@$host "cd blockbench && git add . && git stash && git pull"
  echo done node $host
done
for host in `cat $CLIENTS`; do
  ssh -oStrictHostKeyChecking=no $USER@$host git config --global user.email $GIT_USER_MAIL
  ssh -oStrictHostKeyChecking=no $USER@$host git config --global user.name $GIT_USER
  ssh -oStrictHostKeyChecking=no $USER@$host "cd blockbench && git add . && git stash && git pull"
  echo done node $host
done



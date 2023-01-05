#!/bin/bash
#nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

sudo docker kill $(sudo docker ps -q)
sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -q)
sudo rm -rf ./volumes
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo chmod 755 ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo chown ubuntu:ubuntu ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data


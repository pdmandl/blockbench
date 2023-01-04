#!/bin/bash
#nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

sudo rm -rf ./volumes
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo chmod 755 ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo chown ubuntu:ubuntu ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo kill -9 $(sudo lsof -t -i:8555)
sudo docker-compose up


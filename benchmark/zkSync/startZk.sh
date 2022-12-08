#!/bin/bash
#nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

rm -rf ./volumes
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo chown $USER:$USER ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo chmod 755 ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
sudo kill -9 $(sudo lsof -t -i:8555)
docker-compose up


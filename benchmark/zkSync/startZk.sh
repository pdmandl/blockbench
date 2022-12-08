#!/bin/bash
#nodes
cd `dirname ${BASH_SOURCE-$0}`
. env.sh

rm -rf ./volumes
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
chown $USER:$USER ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
chmod 755 ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
docker compose up


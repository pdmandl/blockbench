#!/usr/bin/env bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/zksync/env/dev ./volumes/zksync/data

docker-compose up


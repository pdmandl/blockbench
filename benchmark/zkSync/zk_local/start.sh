#!/usr/bin/env bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo yadd-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install -y docker-ce
sudo groupadd docker
sudo usermod -aG docker ubuntu
newgrp docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

cd /home/ubuntu/blockbench/benchmark/zkSync/zk_local
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data

docker-compose up


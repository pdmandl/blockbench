sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

cd /home/ubuntu/blockbench/benchmark/zkSync/zk_local
rm -rf ./volumes
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data

docker-compose up


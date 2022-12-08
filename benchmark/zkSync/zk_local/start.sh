
cd /home/ubuntu/blockbench/benchmark/zkSync/zk_local
sudo rm -rf ./volumes
mkdir -p ./volumes
mkdir -p ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
chmod 755 ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
chown paulmandl ./volumes ./volumes/postgres ./volumes/geth ./volumes/zksync/env/dev ./volumes/zksync/data
docker compose up


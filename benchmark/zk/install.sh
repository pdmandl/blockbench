#!/bin/bash
# installing ethereum and docker
#sudo apt-get install -y software-properties-common
#sudo add-apt-repository -y ppa:ethereum/ethereum
#sudo add-apt-repository -y ppa:ethereum/ethereum-dev
#sudo apt-get install -y apt-transport-https ca-certificates
#sudo apt install docker-compose
sudo snap remove docker
sudo apt remove docker
curl -fsSL https://get.docker.com -o get-docker.sh
DRY_RUN=1 sudo sh ./get-docker.sh
#DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
#mkdir -p $DOCKER_CONFIG/cli-plugins
#curl -SL https://github.com/docker/compose/releases/download/v2.14.2/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
#sudo snap install docker
#sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
#echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/docker.list
#sudo apt-get update
#sudo apt-get install -y ethereum
#sudo apt-get install docker-engine
#sudo service docker start


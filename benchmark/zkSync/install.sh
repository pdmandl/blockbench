#!/bin/bash
# installing ethereum and docker
#sudo apt-get install software-properties-common
#sudo add-apt-repository -y ppa:ethereum/ethereum
#sudo add-apt-repository -y ppa:ethereum/ethereum-dev
#sudo apt-get install apt-transport-https ca-certificates
#sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
#echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
#sudo apt-get install -y ethereum
#!/usr/bin/env bash
#sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
#curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#sudo add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install -y docker-ce
sudo groupadd docker
#sudo usermod -aG docker ubuntu
newgrp docker
#sudo apt-get install docker-engine
#sudo service docker start


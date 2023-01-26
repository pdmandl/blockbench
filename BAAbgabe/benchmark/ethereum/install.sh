#!/bin/bash
# installing ethereum and docker
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo add-apt-repository -y ppa:ethereum/ethereum-dev
sudo apt-get install -y apt-transport-https ca-certificates

sudo apt-get update
sudo apt-get install -y ethereum

git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
go build -o polygon-edge main.go
sudo mv polygon-edge /usr/local/bin

sudo apt-get install docker-engine
sudo service docker start


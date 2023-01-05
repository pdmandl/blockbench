#!/bin/bash
# installing ethereum and docker
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo add-apt-repository -y ppa:ethereum/ethereum-dev
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-get update
sudo apt-get install -y ethereum
sudo apt-get install docker-engine
sudo service docker start


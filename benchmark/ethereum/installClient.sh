sudo apt autoremove
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-mark unhold nodejs
sudo apt-mark unhold npm
sudo apt install nodejs
sudo apt install npm

sudo npm install -g truffle
sudo npm install -g ethers
sudo npm install -g @ethersproject/experimental


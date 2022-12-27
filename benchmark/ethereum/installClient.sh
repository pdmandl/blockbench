echo Installation startet at $(date -u)
sudo apt-mark unhold nodejs
sudo apt-mark unhold npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
sudo apt install npm

sudo npm install -g truffle
sudo npm install -g ethers
sudo npm install -g @ethersproject/experimental
sudo npm install -g @truffle/hdwallet-provider
echo Installation finished at $(date -u)

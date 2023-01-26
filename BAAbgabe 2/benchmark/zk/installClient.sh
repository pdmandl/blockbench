echo Installation startet at $(date -u)
#sudo apt-mark unhold nodejs
#sudo apt-mark unhold npm
#curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
#sudo apt install nodejs
#sudo apt install npm

sudo npm install -g truffle
sudo npm install -g @truffle/hdwallet-provider
sudo npm install -g fs
sudo npm install -g ethers
sudo npm install -g @ethersproject/experimental
sudo npm install ethers && sudo npm install @ethersproject/experimental && sudo npm install exceljs && 
echo Installation finished at $(date -u)

echo Installation startet at $(date -u)

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
sudo apt install npm

echo Installation finished at $(date -u)

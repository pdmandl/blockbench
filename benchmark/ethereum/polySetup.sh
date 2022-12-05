sudo rm -rf /usr/local/go 
sudo snap install go --classic
go install
git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
go build -o polygon-edge main.go
sudo mv polygon-edge /usr/local/bin
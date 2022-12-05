sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.19.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
go install
git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
go build -o polygon-edge main.go
sudo mv polygon-edge /usr/local/bin
# folder that contains all benchmark scripts (this could be on a network share)
ETH_HOME=/home/ubuntu/blockbench/benchmark/zk
# folder that contains all benchmark scripts (this could be on a network share)
ETH_HOME_LOCAL=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/zk
# file that contains ip addresses of servers that should be used for setting up the ethereum network
HOSTS=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/zk/hosts
HOSTS_PRIV=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/zk/hosts_priv
RICH_WALLETS=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/zk/rich_wallets
ADDRESSES=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/zk/addresses
# where is your hostfile on your client vm?
HOSTS_ON_CLIENT=/home/ubuntu/blockbench/benchmark/zk/hosts_priv
RPC_PORT=8051
# file that contains ip addresses of servers that should be used for running the benchmark clients
CLIENTS=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/zk/clients
# folder in which ethereum nodes should store the ethereum data
ETH_DATA=/home/ubuntu/node1
# folder in which benchmark clients should store their log files
LOG_DIR=/home/ubuntu/smallbank
# folder that contains the benchmark (client) executable (make sure that you have build the client) (this could be on a network share)
EXE_HOME=/home/ubuntu/blockbench/src/macro/smallbank
# name/type of the benchmark
#BENCHMARK=ycsb
#BENCHMARK=nft
BENCHMARK=ycsb
# SSH user (with public key auth) to use to run the scripts on all machines
USER=ubuntu
# RPCport used by clients and ethereum nodes
RPCPORT='8051'
# private key that should be used to create an account as ethereum coinbase
PRIVATEKEY=$ETH_HOME/keys
# Password used for unlocking the above private key or for creating a new account as ethereum coinbase
PWD="r2d2c3po"

GIT_REPO=https://github.com/pdmandl/blockbench.git
GIT_USER_MAIL=p.d.mandl@gmail.com
GIT_USER=pdmandl
##comment these out for smallbank
#EXE_HOME=$ETH_HOME/../../src/smallbank/ethereum/ycsb


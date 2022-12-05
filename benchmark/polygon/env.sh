# folder that contains all benchmark scripts (this could be on a network share)
ETH_HOME=/home/ubuntu/blockbench/benchmark/polygon
# file that contains ip addresses of servers that should be used for setting up the ethereum network
HOSTS=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/polygon/hosts
# where is your hostfile on your client vm?
CLIENT_HOSTS=/home/ubuntu/blockbench/benchmark/polygon/hosts_priv
RPC_PORT=8051
# file that contains ip addresses of servers that should be used for running the benchmark clients
CLIENTS=/Users/paulmandl/Downloads/blockbench-master-mehd/benchmark/polygon/clients
# folder in which ethereum nodes should store the ethereum data
ETH_DATA=/home/ubuntu/node1
# folder in which benchmark clients should store their log files
LOG_DIR=/home/ubuntu/smallbank
# folder that contains the benchmark (client) executable (make sure that you have build the client) (this could be on a network share)
EXE_HOME=/home/ubuntu/blockbench/src/macro/smallbank
# name/type of the benchmark
#BENCHMARK=ycsb
BENCHMARK=smallbank
# SSH user (with public key auth) to use to run the scripts on all machines
USER=ubuntu
# RPCport used by clients and ethereum nodes
RPCPORT='8051'
# private key that should be used to create an account as ethereum coinbase
PRIVATEKEY=$ETH_HOME/keys
# Password used for unlocking the above private key or for creating a new account as ethereum coinbase
PWD="r2d2c3po"

GIT_REPO=https://github.com/pdmandl/blockbench.git
##comment these out for smallbank
#EXE_HOME=$ETH_HOME/../../src/smallbank/ethereum/ycsb

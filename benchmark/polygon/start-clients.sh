#!/bin/bash
# args=THREADS index N txrate
echo IN START_CLIENTS threads=$1 clientID=$2 nservers=$3 txrate=$4

cd `dirname ${BASH_SOURCE-$0}`
. env.sh

#LOG_DIR=$ETH_HOME/../src/ycsb/exp_$3"_"servers_run4
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_DIR=$LOG_DIR/exp_$3"_"servers_$1"_"threads_$4"_"rates"_"$TIMESTAMP
mkdir -p $LOG_DIR
i=0
echo "iterating over hosts for clientID=$2"
for host in `cat $HOSTS_ON_CLIENT`; do
  let n=i/2
  echo "n ist " $n
  echo "i ist " $i
  let i=i+1
  if [[ $n -eq $2 ]]; then
    #cd $ETH_HOME/../src/ycsb
    cd $EXE_HOME
    echo "Starting driver on endpoint " $host
    #both ycsbc and smallbank use the same driver
    LD_LIBRARY_PATH=/usr/local/lib
    export LD_LIBRARY_PATH
    chmod 755 driver || make driver && chmod 755 driver
    #nohup ./driver -db ethereum -threads $1 -P workloads/workloada.spec -endpoint $host:8545 -txrate $4 -wl ycsb -wt 60 > $LOG_DIR/client_$2"_"$host 2>&1 &
    nohup ./driver -db ethereum -ops 1000 -threads $1 -txrate $4 -fp stat.txt -wl smallbank -wt 60 -endpoint $host:8545 > $LOG_DIR/client_$2"_"$host 2>&1 &
  else
    echo at host $i, value for n=$n did not match clientID=$2, not starting client to keep number of clients and servers equal
  fi
done


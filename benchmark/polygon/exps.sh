# running experiments
RATES=(50 50 50 50)
NNODES=(8 8 8 8)
NCLIENTS=(4 4 4 4)

i=0
chmod 755 run-bench.sh
for rate in "${RATES[@]}"; do
    echo starting run-bench.sh ${NNODES[i]} 1 ${NCLIENTS[i]} $rate
    bash run-bench.sh ${NNODES[i]} 1 ${NCLIENTS[i]} $rate
    let i=$i+1
done

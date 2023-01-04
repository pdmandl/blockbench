# running experiments
RATES=(25 25 50 50 75 75 100 100)
NNODES=(4 4 4 4 4 4 4 4)
NCLIENTS=(4 4 4 4 4 4 4 4)
SLEEPS=(180 0 180 0 180 0 180 0)

i=0
chmod 755 run-bench.sh
for rate in "${RATES[@]}"; do
    echo starting run-bench.sh ${NNODES[i]} 1 ${NCLIENTS[i]} $rate with sleep of ${SLEEPS[i]}
    bash run-bench.sh ${NNODES[i]} 1 ${NCLIENTS[i]} $rate ${SLEEPS[i]}
    let i=$i+1
done

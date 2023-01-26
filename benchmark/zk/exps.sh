# running experiments
RATES=(100 100 100 100)
NNODES=(4 8 12 16)
NCLIENTS=(4 4 4 4 )
SLEEPS=(250 250 250 250)

i=0
chmod 755 run-bench.sh
for rate in "${RATES[@]}"; do
    bash run-bench.sh ${NNODES[i]} 1 ${NCLIENTS[i]} $rate ${SLEEPS[i]}
    let i=$i+1
done

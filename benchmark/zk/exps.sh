# running experiments
RATES=(25 50 75 100)
NNODES=(4 4 4 4)
NCLIENTS=(4 4 4 4 )
SLEEPS=(350 350 350 350)

i=0
chmod 755 run-bench.sh
for rate in "${RATES[@]}"; do
    bash run-bench.sh ${NNODES[i]} 1 ${NCLIENTS[i]} $rate ${SLEEPS[i]}
    let i=$i+1
done

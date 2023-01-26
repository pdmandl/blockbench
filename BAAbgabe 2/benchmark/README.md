# BlockBench Deployment Scripts

## Setup
Run the `install.sh` script inside `ethereum` , `polygon` and `zkSync` directory to install `geth` and
polygon-edge respectively. Both need `sudo` privilege.

## Source structure
+ Smart contract sources are in [benchmark/contracts](benchmark/contracts) directory.
+ Instructions and scripts to run benchmarks for Ethereum, Polygon and zkSync are in [ethereum](benchmark/ethereum),
[polygon](benchmark/polygon) , [zkSync](benchmark/zk) directories respectively.
+ Drivers for benchmark workloads are in the directories as well.

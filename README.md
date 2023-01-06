# BlockBench

BlockBench is the first benchmarking framework for private blockchain systems.
It serves as a fair means of comparison for different platforms and enables deeper understanding
of different system design choices. This is a modified version by Paul Mandl, that focuses on Ethereum based blockchain systems

It comes with 3 Macro Benchmarks 

## Workloads 

### Macro-benchmark

* YCSB (KVStore).
* SmallBank (OLTP).
* NFT (Minting).

## Source file structure

+ Smart contract sources are in [benchmark/contracts](benchmark/contracts) directory.
+ Instructions and scripts to run benchmarks for Ethereum, Polygon and zkSync are in [ethereum](benchmark/ethereum),
[polygon](benchmark/polygon) , [zkSync](benchmark/zk) directories respectively.
+ Drivers for benchmark workloads are in the directories as well.

## Dependency

### Node.js libraries
* [Ethers.js](https://github.com/ethereum/web3.js/)
* [Excel.js](https://github.com/ethereum/web3.js/)
* [Hardhat](https://www.npmjs.com/package/zipfian)
* [Truffle.js](https://www.npmjs.com/package/bignumber.js)

### Blockchain 
* [geth(ethereum)](https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu)
* [polygon-edge](https://github.com/0xPolygon/polygon-edge.git)
* [zkSync Dockerized](https://github.com/matter-labs/local-setup.git)

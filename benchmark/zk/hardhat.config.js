require("@nomicfoundation/hardhat-toolbox");
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");

const zkSyncTestnet = {
  url: "http://localhost:3050",
  ethNetwork: "http://localhost:8545",
  zksync: true,
};
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.2.1",
    compilerSource: "binary",
    settings: {
      experimental: {
        dockerImage: "matterlabs/zksolc",
        tag: "v1.2.1",
      },
    },
  },
  // defaults to zkSync network
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      zksync: true,
    },
    // load test network details
    zkSyncTestnet,
  },
  solidity: {
    version: "0.8.16",
  },
};

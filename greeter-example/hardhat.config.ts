require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    private: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // URL of the Ethereum provider (e.g., Ganache)
      accounts: [
        "0x1234567890123456789012345678901234567890123456789012345678901234", // Private key of an Ethereum account
      ],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
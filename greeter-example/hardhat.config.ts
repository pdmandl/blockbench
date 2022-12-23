require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    private: {
      url: "http://localhost:8545", // URL of the Ethereum provider (e.g., Ganache)
      accounts: [
        {
          privateKey:
            "0x1234567890123456789012345678901234567890123456789012345678901234", // Private key of an Ethereum account
          balance: "100000000000000000000", // Initial balance of the Ethereum account (in wei)
        },
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
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
// TODO: INSERT THE PRIVATE ADDRESS OF ONE OF YOUR NODES
const rpc = "http://192.168.4.116:8051";
module.exports = {
  networks: {
    private: {
      provider: () => new HDWalletProvider(mnemonic, rpc),
      network_id: "*", // This network is yours, in the cloud.
      production: true, // Treats this network as if it was a public net. (default: false)
    },
  },
  compilers: {
    solc: {
      version: "0.8.15",
    },
  },
};

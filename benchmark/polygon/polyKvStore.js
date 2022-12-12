const Tx = require("ethereumjs-tx").Transaction;
const ethers = require("ethers");

let url = "http://192.168.4.150:8545";
let provider = new ethers.providers.JsonRpcProvider(url);
var signer = new ethers.Wallet(privateKey, provider);

var address = "<Deployed Contract Address>";
var abi = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

myContract_write = new ethers.Contract(address, abi, signer); // Write only
myContract_read = new ethers.Contract(address, abi, provider); // Read only

// Writing to Smart Contract
myContract_write.store(100).then((result) => {
  console.log(result);
});
// Reading from Smart Contract
myContract_read.retrieve().then((result) => {
  console.log(result);
});

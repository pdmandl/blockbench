const Tx = require("ethereumjs-tx").Transaction;
const ethers = require("ethers");

let url = "http://192.168.4.150:8545";
let provider = new ethers.providers.JsonRpcProvider(url);
var signer = new ethers.Wallet(privateKey, provider);

var address = "0x0000000000000000000000000000000000001110";
var abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        internalType: "struct Greeter.MyStruct[]",
        name: "myStr",
        type: "tuple[]",
      },
      {
        internalType: "int256[]",
        name: "myArgNum",
        type: "int256[]",
      },
      {
        internalType: "string",
        name: "mySecondStr",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "greetNum",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "greetSecond",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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

const ethers = require("ethers");

let url = process.argv[3];
let provider = new ethers.providers.JsonRpcProvider(url);
var signer = new ethers.Wallet(process.argv[2], provider);

var address = "0x0000000000000000000000000000000000001111";
var abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
    ],
    name: "get",
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
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "string",
        name: "value",
        type: "string",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
myContract_write = new ethers.Contract(address, abi, signer); // Write only
myContract_read = new ethers.Contract(address, abi, provider); // Read only
const getGasPrice = async () => {
  console.log(await myContract_write.estimateGas.set(1, "TEST123"));
};
const txs = Array.from(Array(process.argv[4]).keys());
for (let i of txs) {
  getGasPrice();
  /* myContract_write
    .set(i.toString(), "TEST 123")
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    }); */
}
for (let i of txs) {
  myContract_read
    .get(i.toString())
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
}

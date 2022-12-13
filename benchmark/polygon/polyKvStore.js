const ethers = require("ethers");
const txs = Array(parseInt(process.argv[4]));
for (let i in txs) txs[i] = i;
console.log(txs);
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
const myContract_write = new ethers.Contract(address, abi, signer); // Write only
const myContract_read = new ethers.Contract(address, abi, provider); // Read only
const getGasPrice = async (id, value) => {
  console.log(
    "Gas price is: ",
    (await myContract_write.estimateGas.set(id, value)).toNumber()
  );
};
const savePacket = async (id, value) => {
  console.log("Saving Packet: " + value + " to id " + id + " started...");
  console.log(getGasPrice(id, value));
  try {
    const res = await myContract_write.set(id, value);
    const receipt = await res.wait();
    console.log(receipt);
  } catch (e) {
    console.log(e);
  }
  console.log("Saving Packet: " + value + " to id " + id + " finished.");
};
const readPacket = async (id) => {
  console.log("Reading id " + id + " started...");
  try {
    const res = await myContract_read.get(id);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
  console.log("Reading id " + id + " finished.");
};
const doTransaction = async (i) => {
  try {
    const res = await savePacket(i, "TEST");
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
const doTransactions = async () => {
  while (txs.length > 0) {
    const i = txs.shift();
    console.log(i);
    await doTransaction(i);
    await readPacket(i.toString());
  }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const printer = async () => {
  sleep(1000);
  console.log(
    `Still ${txs.length} of ${process.argv[4]} transactions to process.`
  );
};
printer();
doTransactions();

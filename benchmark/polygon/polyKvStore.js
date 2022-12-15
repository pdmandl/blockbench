const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
let txs = [];
const doneTxs = [];
let url = process.argv[3];
let provider = new ethers.providers.JsonRpcProvider(url);
var signer = new ethers.Wallet(process.argv[2], provider);
var managedSigner = new NonceManager(signer);
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
const myContract_write = new ethers.Contract(address, abi, managedSigner); // Write only
const myContract_read = new ethers.Contract(address, abi, provider); // Read only
const savePacket = async (id, value) => {
  console.log("Saving Packet: " + value + " to id " + id + " started...");
  try {
    const start = Date.now();
    const res = await myContract_write.set(id, value);
    const receipt = await res.wait();
    const end = Date.now();
    console.log("transaction took " + (end - start) + "ms");
    console.log("receipt", receipt);
  } catch (e) {
    console.log(e);
  }
  txs = txs.filter((res) => res.id !== id);
  console.log(`remove packet with id ${id}`);
  console.log("Saving Packet: " + value + " to id " + id + " finished.");
};
for (let i = 0; i < parseInt(process.argv[4]); i++) {
  txs[i] = { tx: savePacket(i, "TEST" + i), id: i };
}
const getGasPriceW = async (id, value) => {
  console.log(
    "Gas price is: ",
    (await myContract_write.estimateGas.set(id, value)).toNumber()
  );
};
const getGasPriceR = async (id) => {
  console.log(
    "Gas price is: ",
    (await myContract_read.estimateGas.get(id)).toNumber()
  );
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
    await savePacket(i, "TEST" + i);
  } catch (e) {
    console.log(e);
  }
};
const doRTransactions = async () => {
  while (doneTxs.length > 0) {
    const i = doneTxs.shift();
    await i;
  }
};
const doWTransactions = async () => {
  let result = [];
  const doneTxs = await Promise.all(txs.map((res) => (res = res.tx)));
  for (let tx of doneTxs) {
    result = [...result, tx];
  }
  console.table(result);
  //doRTransactions();
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const printer = async () => {
  while (txs.length > 0) {
    await sleep(2000);
    console.log(txs);
    console.log(
      `Still ${txs.length} of ${process.argv[4]} transactions to process.`
    );
  }
};
printer();
doWTransactions();
console.log("test");

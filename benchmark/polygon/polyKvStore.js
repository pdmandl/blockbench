const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
let txs = [];
let txsR = [];
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
  const start = Date.now();
  try {
    const res = await myContract_write.set(id, value);
    const receipt = await res.wait();
  } catch (e) {
    console.log(e);
  }
  const end = Date.now();
  //txs = txs.filter((res) => res.id !== id);
  console.log("Saving Packet: " + value + " to id " + id + " finished.");
  return end - start;
};
const readPacket = async (id) => {
  console.log("Reading id " + id + " started...");
  const start = Date.now();
  try {
    const res = await myContract_read.get(id);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
  const end = Date.now();
  txsR = txsR.filter((res) => res.id !== id);
  console.log("Reading Packet at id: " + id + " finished.");
  return end - start;
};
const doRTransactions = async () => {
  let result = [];
  try {
    const doneTxs = await Promise.all(txsR.map((res) => res.tx()));
    for (let tx of doneTxs) {
      result = [...result, tx];
    }
  } catch (e) {}
  console.table(result);
};
const doWTransactions = async (numberOfTxsPerRun, run) => {
  let result = [];
  const txsForRun = txs.slice(
    run * numberOfTxsPerRun,
    numberOfTxsPerRun + run * numberOfTxsPerRun
  );
  console.log(
    run * numberOfTxsPerRun,
    numberOfTxsPerRun + run * numberOfTxsPerRun
  );
  console.table(txsForRun);
  try {
    const doneTxs = await Promise.all(txsForRun.map((res) => res.tx()));
    for (let tx of doneTxs) {
      result = [...result, tx];
    }
  } catch (e) {}
  //doRTransactions();
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const printer = async () => {
  //while (txs.length > 0 || txsR.length > 0) {
  while (txs.length > 0) {
    try {
      await sleep(2000);
    } catch (e) {}
    console.log(
      `Still ${txs.length} of ${process.argv[4]} transactions to process.`
    );
    console.log(
      `and ${txsR.length} of ${process.argv[4]} transactions to read.`
    );
  }
};
const doTxs = async (txCount, run) => {
  await sleep(1000);
  doWTransactions(txCount, run);
};
const doTransactions = async () => {
  console.table(txs);
  let run = 0;
  while (run * parseInt(process.argv[4]) < parseInt(process.argv[5])) {
    await doTxs(
      parseInt(process.argv[4]) < txs.length
        ? parseInt(process.argv[4])
        : txs.length,
      run
    );
    run += 1;
  }
};
for (let i = 0; i < parseInt(process.argv[5]); i++) {
  txs[i] = { tx: () => savePacket(i, "TEST" + i), id: i };
  txsR[i] = { tx: () => readPacket(i), id: i };
}
printer();
doTransactions();

/**
 * FIRST ARGUMENT: WALLET PK
 * SECOND ARGUMENT: RPC_URL
 * THIRD ARGUMENT: NR_REQUESTS_PER_SECOND
 * FOURTH ARGUMENT: TOTAL_NR_REQUESTS
 * FIFTH ARGUMENT: CONTRACT ADDRESS
 * SIXTH ARGUMENT: INDEX
 */
console.log("WALLET" + process.argv[2]);
console.log("RPC_URL" + process.argv[3]);
console.log("NR_REQUESTS_PER_SECOND" + process.argv[4]);
console.log("TOTAL_NR_REQUESTS" + process.argv[5]);
console.log("CONTRACT ADDRESS" + process.argv[6]);
console.log("INDEX" + process.argv[7]);
console.log("NR_OF_CLIENTS" + process.argv[8]);

const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");

let allTxs = [];
let txs = [];
let txsR = [];
const nonce = 0;
const doneTxs = [];
let url = process.argv[3];
let total = [];
let provider = new ethers.providers.JsonRpcProvider(url);
var signer = new ethers.Wallet(process.argv[2], provider);
var managedSigner = new NonceManager(signer);
var address = process.argv[6];
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
  const start = Date.now();
  try {
    const res = await myContract_write.set(id, value, {
      gasLimit: 5000000,
    });
    const receipt = await res.wait();
    console.log(receipt);
  } catch (e) {
    console.log(e);
  }
  const end = Date.now();
  txs = txs.filter((res) => res.id !== id);
  return end - start;
};
const readPacket = async (id) => {
  console.log("Reading id " + id + " started...");
  const start = Date.now();
  try {
    const res = await myContract_read.get(id, {
      gasLimit: 5000000,
    });
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
  const txsForRun = allTxs.slice(
    run * numberOfTxsPerRun,
    numberOfTxsPerRun + run * numberOfTxsPerRun
  );
  try {
    const doneTxs = await Promise.all(txsForRun.map((res) => res.tx()));
    for (let tx of doneTxs) {
      result = [...result, tx];
      total = [...total, tx];
    }
  } catch (e) {}
  //doRTransactions();
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const printer = async () => {
  //while (txs.length > 0 || txsR.length > 0) {
  while (txs.length > 0) {
    try {
      await sleep(1000);
    } catch (e) {}
    console.log(
      `Still ${txs.length} of ${process.argv[5]} transactions to process.`
    );
    /*console.log(
      `and ${txsR.length} of ${process.argv[4]} transactions to read.`
    );*/
  }
};
const measureTime = async () => {
  const start = Date.now();
  console.log("the test started at " + start);
  while (txs.length > 0) {
    await sleep(1);
  }
  const end = Date.now();
  console.log(end);
  console.log("the test ended at " + end);
  console.log("the test took " + (end - start) / 1000 + "s to finish.");
  let ttl = 0;
  for (let t of total) {
    ttl = ttl + t;
  }
  console.log("Durschn. Latenz: " + ttl / total.length + " ms");
  console.log("Durchsatz: " + total.length / ((end - start) / 1000) + " tx/s");
};
const doTxs = async (txCount, run) => {
  await sleep(1000);
  doWTransactions(txCount, run);
};
const doTransactions = async () => {
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
const txCount = parseInt(process.argv[7]);
for (let i = 0; i < parseInt(process.argv[5]); i++) {
  managedSigner.setTransactionCount(txCount);
  managedSigner.incrementTransactionCount(parseInt(process.argv[8]));
  txs[i] = { tx: () => savePacket(i, "TEST" + i), id: i };
  txsR[i] = { tx: () => readPacket(i), id: i };
}
allTxs = txs;
measureTime();
printer();
doTransactions();

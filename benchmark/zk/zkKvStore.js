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
console.log("MAX_TIME" + process.argv[9]);

const ethers = require("ethers");
const zksync = require("zksync-web3");
const Excel = require("exceljs");
const MAX_TIME = parseInt(process.argv[9]);
let workbook = new Excel.Workbook();
let worksheet = workbook.addWorksheet(
  `Transactions_${process.argv[4]}tps_${process.argv[5]}tts`
);
let worksheet2 = workbook.addWorksheet(`General`);
let allTxs = [];
let txs = [];
let url = process.argv[3];
let total = [];
let success = 0;
let processed = 0;
let fail = 0;
let provider = new zksync.Provider(url + ":3050");
const ethereumProvider = new ethers.providers.JsonRpcProvider(url + ":8545");
var signer = new zksync.Wallet(process.argv[2], provider, ethereumProvider);
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
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const myContract_write = new ethers.Contract(address, abi, signer); // Write only
const myContract_read = new ethers.Contract(address, abi, provider); // Read only

const savePacket = async (id, value, sleepTime, nonce) => {
  await sleep(sleepTime);
  try {
    const txCount = await provider.getTransactionCount(signer.address);
    if (nonce - 50 > txCount) nonce = txCount + 49;
    if (nonce < txCount) nonce = txCount + 1;
  } catch (e) {
    console.log(e);
  }
  console.log("id: " + id, "value: " + value);
  const start = Date.now();
  try {
    const res = await myContract_write.set(id, value, {
      gasLimit: 5000000,
      nonce,
    });
    const receipt = await res.wait();
    success += 1;
  } catch (e) {
    fail += 1;
    console.error(e);
  }
  const end = Date.now();
  total.push(end - start);
  txs = txs.filter((res) => res.id !== id);
  processed += 1;
  return end - start;
};
const doWTransactions = async (numberOfTxsPerRun, run) => {
  let result = [];
  const txsForRun = allTxs.slice(
    run * numberOfTxsPerRun,
    numberOfTxsPerRun + run * numberOfTxsPerRun
  );
  try {
    const doneTxs = await Promise.all(
      txsForRun.map((res, index) => res.tx((1000 / txsForRun.length) * index))
    );
    for (let tx of doneTxs) {
      result = [...result, tx];
    }
  } catch (e) {
    console.error(e);
  }
  //doRTransactions();
};
const printer = async (start) => {
  while (txs.length > 0 && Date.now() - start < MAX_TIME) {
    try {
      await sleep(1000);
    } catch (e) {}
    console.log(
      `Still ${txs.length} of ${process.argv[5]} transactions to process.`
    );
  }
};
const measureTime = async (start) => {
  const testStart = Date.now();
  while (txs.length > 0 && Date.now() - start < MAX_TIME) {
    await sleep(1);
  }
  const end = Date.now();
  const notExecuted = txs.length;
  console.log("the test ended at " + end);
  console.log("the test took " + (end - testStart) / 1000 + "s to finish.");
  let ttl = 0;
  for (let t of total) {
    ttl = ttl + t;
  }
  worksheet.columns = [
    { header: "Tx nr.", key: "id" },
    { header: "Latency", key: "value" },
  ];
  worksheet2.columns = [
    { header: "Processed", key: "success" },
    { header: "Failed", key: "fail" },
    { header: "Durschn. Latenz:", key: "latency" },
    { header: "Dursatz:", key: "throughput" },
    { header: "Total Time", key: "time" },
    { header: "Nicht verarbeitet", key: "notExecuted" },
  ];
  total.forEach((e, index) => {
    worksheet.addRow({
      ...{ id: index, value: e },
    });
  });
  console.log(end - start);
  worksheet2.addRow({
    success: success,
    fail: fail,
    latency: ttl / total.length + " ms",
    throughput: total.length / ((end - testStart) / 1000) + " tx/s",
    time: (end - testStart) / 1000,
    notExecuted: notExecuted,
  });
  workbook.xlsx.writeFile(
    `Transactions_${process.argv[4]}tps_${process.argv[5]}tts.xlsx`
  );
  console.log("Successful Txs:" + processed);
  console.log("Not executed Txs:" + notExecuted);
  console.log("Durschn. Latenz: " + ttl / total.length + " ms");
  console.log(
    "Durchsatz: " + total.length / ((end - testStart) / 1000) + " tx/s"
  );
};
const doTxs = async (txCount, run) => {
  await sleep(2000);
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
const main = async () => {
  const start = Date.now();
  const nonce = await provider.getTransactionCount(signer.address);
  for (let i = 0; i < parseInt(process.argv[5]); i++) {
    const saveIndex = parseInt(process.argv[7]) * parseInt(process.argv[5]) + i;
    txs[i] = {
      tx: (sleep) => savePacket(saveIndex, "TEST" + i, sleep, nonce + i),
      id: saveIndex,
    };
  }
  allTxs = txs;
  measureTime(start);
  printer(start);
  doTransactions();
};
main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

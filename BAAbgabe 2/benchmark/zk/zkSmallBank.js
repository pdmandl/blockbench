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
console.log("TO_ADDRESS" + process.argv[7]);

const ethers = require("ethers");
const zksync = require("zksync-web3");
const toAddress = process.argv[7];
const Excel = require("exceljs");
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
        name: "arg0",
        type: "string",
      },
      {
        internalType: "string",
        name: "arg1",
        type: "string",
      },
    ],
    name: "almagate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "arg0",
        type: "string",
      },
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "arg0",
        type: "string",
      },
      {
        internalType: "string",
        name: "arg1",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "arg2",
        type: "uint256",
      },
    ],
    name: "sendPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "arg0",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "arg1",
        type: "uint256",
      },
    ],
    name: "updateBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "arg0",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "arg1",
        type: "uint256",
      },
    ],
    name: "updateSaving",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "arg0",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "arg1",
        type: "uint256",
      },
    ],
    name: "writeCheck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const myContract_write = new zksync.Contract(address, abi, signer); // Write only
const myContract_read = new zksync.Contract(address, abi, provider); // Read only
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const sendPayment = async (from, to, value, id, sleepTime) => {
  console.log("from: " + from, "to: " + to, "value: " + value);
  await sleep(sleepTime - 0.1 * sleepTime);
  const start = Date.now();
  try {
    const res = await myContract_write.sendPayment(from, to, value, {
      gasLimit: 5000000,
    });
    const receipt = await res.wait();
    success += 1;
  } catch (e) {
    fail += 1;
    console.error(e);
  }
  const end = Date.now();
  console.log("done from: " + from, "to: " + to, "value: " + value);
  txs = txs.filter((resp) => resp.id !== id);
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
      total = [...total, tx];
    }
  } catch (e) {
    console.error(e);
  }
  //doRTransactions();
};
const printer = async () => {
  while (txs.length > 0) {
    try {
      await sleep(1000);
    } catch (e) {}
    console.log(
      `Still ${txs.length} of ${process.argv[5]} transactions to process.`
    );
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
  worksheet.columns = [
    { header: "Tx nr.", key: "id" },
    { header: "Latency", key: "value" },
  ];
  worksheet2.columns = [
    { header: "Successful", key: "success" },
    { header: "Failed", key: "fail" },
    { header: "Durschn. Latenz:", key: "latency" },
    { header: "Dursatz:", key: "throughput" },
    { header: "Total Time", key: "time" },
  ];
  total.forEach((e, index) => {
    worksheet.addRow({
      ...{ id: index, value: e },
    });
  });
  worksheet2.addRow({
    success: success,
    fail: fail,
    latency: ttl / total.length + " ms",
    throughput: total.length / ((end - start) / 1000) + " tx/s",
    time: (end - start) / 1000,
  });
  workbook.xlsx.writeFile(
    `Transactions_${process.argv[4]}tps_${process.argv[5]}tts.xlsx`
  );
  console.log("Successful Txs:" + success);
  console.log("Failed Txs:" + fail);
  console.log("Durschn. Latenz: " + ttl / total.length + " ms");
  console.log("Durchsatz: " + total.length / ((end - start) / 1000) + " tx/s");
};
const doTxs = async (txCount, run) => {
  await sleep(1000);
  doWTransactions(txCount, run);
};
const doTransactions = async () => {
  let run = 0;
  await myContract_write.updateBalance(signer.address, 1000, {
    gasLimit: 5000000,
  });
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
  txs[i] = {
    tx: (sleep) => sendPayment(signer.address, toAddress, 1, i, sleep),
    id: i,
  };
}
allTxs = txs;
measureTime();
printer();
doTransactions();

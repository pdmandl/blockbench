const { fail } = require("assert");
const ExcelJS = require("exceljs");
var fs = require("fs");

const path =
  "/Users/paulmandl/Downloads/blockbench-master-mehd/experiments/RUNS";
function splitByTps(tps, file) {
  let tps_25;
  let tps_50;
  let tps_75;
  let tps_100;
  switch (tps) {
    case 25:
      tps_25 = file;
      break;
    case 50:
      tps_50 = file;
      break;
    case 75:
      tps_75 = file;
      break;
    case 100:
      tps_100 = file;
      break;
  }
  return { tps_25, tps_50, tps_75, tps_100 };
}
function splitByNode(node, file) {
  let node4;
  let node8;
  let node12;
  let node16;
  switch (node) {
    case 4:
      node4 = file;
      break;
    case 8:
      node8 = file;
      break;
    case 12:
      node12 = file;
      break;
    case 16:
      node16 = file;
      break;
  }
  return { node4, node8, node12, node16 };
}
function gather(prefix) {
  const runs = [prefix + "1", prefix + "2", prefix + "3"];
  const tempRuns = [];
  for (let name of runs) {
    const run = fs.readdirSync(name);
    let tempRun = {};
    const files = { tps_25: [], tps_50: [], tps_75: [], tps_100: [] };
    for (let file of run) {
      const tps = parseInt(file.split("_")[1]);
      const splits = splitByTps(tps, file);
      if (splits.tps_25) files.tps_25.push(splits.tps_25);
      if (splits.tps_50) files.tps_50.push(splits.tps_50);
      if (splits.tps_75) files.tps_75.push(splits.tps_75);
      if (splits.tps_100) files.tps_100.push(splits.tps_100);
    }
    tempRun.run = name;
    tempRun.files = files;
    tempRuns.push(tempRun);
  }
  return tempRuns;
}
function gatherScaling(prefix) {
  const runs = [prefix + "1", prefix + "2", prefix + "3"];
  const tempRuns = [];
  for (let name of runs) {
    const run = fs.readdirSync(name);
    let tempRun = {};
    const files = { node4: [], node8: [], node12: [], node16: [] };
    for (let file of run) {
      const tps = parseInt(file.split("_")[1]);
      console.log(tps);
      const splits = splitByNode(tps, file);
      if (splits.node4) files.node4.push(splits.node4);
      if (splits.node8) files.node8.push(splits.node8);
      if (splits.node12) files.node12.push(splits.node12);
      if (splits.node16) files.node16.push(splits.node16);
    }
    tempRun.run = name;
    tempRun.files = files;
    tempRuns.push(tempRun);
  }
  return tempRuns;
}
async function createThroughput(throughput, fileName) {
  const splt = fileName.split("/");
  const tmp = splt[splt.length - 1];
  const tmps = tmp.split("_");
  tmps.pop();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");
  worksheet.columns = [
    { header: "4 Nodes", key: "node4", width: 15 },
    { header: "8 Nodes", key: "node8", width: 15 },
    { header: "12 Nodes", key: "node12", width: 15 },
    { header: "16 Nodes", key: "node16", width: 15 },
  ];
  worksheet.addRow(throughput);
  await workbook.xlsx.writeFile(tmps.join("_") + "_throughput" + ".xlsx");
}
async function createSuccess(success, fileName) {
  const splt = fileName.split("/");
  const tmp = splt[splt.length - 1];
  const tmps = tmp.split("_");
  tmps.pop();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");
  worksheet.columns = [
    { header: "SUCCESS", key: "success", width: 15 },
    { header: "FAIL", key: "fail", width: 15 },
    { header: "NO ANSWER", key: "notExecuted", width: 15 },
  ];
  worksheet.addRow(success);
  await workbook.xlsx.writeFile(tmps.join("_") + "_rate" + ".xlsx");
}
async function createSuccess(success, fileName) {
  const splt = fileName.split("/");
  const tmp = splt[splt.length - 1];
  const tmps = tmp.split("_");
  tmps.pop();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");
  worksheet.columns = [
    { header: "SUCCESS", key: "success", width: 15 },
    { header: "FAIL", key: "fail", width: 15 },
    { header: "NO ANSWER", key: "notExecuted", width: 15 },
  ];
  worksheet.addRow(success);
  await workbook.xlsx.writeFile(tmps.join("_") + "_rate" + ".xlsx");
}
async function createTransactions(transactions, fileName) {
  const splt = fileName.split("/");
  const tmp = splt[splt.length - 1];
  const tmps = tmp.split("_");
  tmps.pop();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");

  worksheet.columns = [
    { header: "4 Nodes", key: "node4", width: 15 },
    { header: "8 Nodes", key: "node8", width: 15 },
    { header: "12 Nodes", key: "node12", width: 15 },
    { header: "16 Nodes", key: "node16", width: 15 },
  ];
  for (let i = 0; i < 6000; i++) {
    console.log("doing tx:" + i);
    worksheet.addRow({
      node4: transactions.node4[i] ? transactions.node4[i] : "",
      node8: transactions.node8[i] ? transactions.node8[i] : "",
      node12: transactions.node12[i] ? transactions.node12[i] : "",
      node16: transactions.node16[i] ? transactions.node16[i] : "",
    });
  }
  await workbook.xlsx.writeFile(tmps.join("_") + "_latency" + ".xlsx");
}
async function readFile(fileName) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(fileName);
  const ws = wb.getWorksheet("General");
  const c1 = ws.getColumn(1);
  const c2 = ws.getColumn(2);
  const c3 = ws.getColumn(3);
  const c5 = ws.getColumn(5);
  const c6 = ws.getColumn(6);
  const splt = fileName.split("/");
  const tmp = splt[splt.length - 1];
  let tmps = tmp.split("_");
  tmps.pop();
  tmps.splice(1, 1);
  const name = tmps.join("_");
  const ws2 = wb.getWorksheet(1);
  const c2ws2 = ws2.getColumn(2);
  const values = [];
  c2ws2.eachCell((e, index) => {
    if (index > 1) values.push(e.value);
  });
  return {
    time: c5.values[2],
    success: c1.values[2],
    fail: c2.values[2],
    latency: c3.values[2],
    notExecuted: c6.values[2] ? c6.values[2] : 0,
    transactions: values,
  };
}
async function start(type) {
  /*   const runs = gather(
    "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK/ETH_SMALLBANK_RUN"
  );
  await readFiles(
    runs,
    "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK/ETH_SMALLBANK_RUN"
  );
  const runs2 = gather(
    "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK/POLY_SMALLBANK_RUN"
  );
  await readFiles(
    runs2,
    "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK/POLY_SMALLBANK_RUN"
  );
  const runs3 = gather(
    "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK/ZK_SMALLBANK_RUN"
  );
  await readFiles(
    runs3,
    "Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK/ZK_SMALLBANK_RUN"
  ); */
  if (type == "SKALIERUNG") {
    const runs = gatherScaling(path + `/${type}/ETH_${type}_`);
    await readFiles(runs, path + `/${type}/ETH_${type}_`);
    const runs2 = gatherScaling(path + `/${type}/POLY_${type}_`);
    await readFiles(runs2, path + `/${type}/POLY_${type}_`);
    const runs3 = gatherScaling(path + `/${type}/ZK_${type}_`);
    await readFiles(runs3, path + `/${type}/ZK_${type}_`);
  } else {
    const runs = gather(path + `/${type}/ETH_${type}_RUN`);
    await readFiles(runs, path + `/${type}/ETH_${type}_RUN`);
    const runs2 = gather(path + `/${type}/POLY_${type}_RUN`);
    await readFiles(runs2, path + `/${type}/POLY_${type}_RUN`);
    const runs3 = gather(path + `/${type}/ZK_${type}_RUN`);
    await readFiles(runs3, path + `/${type}/ZK_${type}_RUN`);
  }
  /*   const dirs = fs.readdirSync("/Users/paulmandl/Desktop/experiments/RUNS");
  if (dirs[0] == ".DS_Store") dirs.shift();
  const files = [];

  const inner = fs.readdirSync(
    "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK"
  );
  if (inner[0] == ".DS_Store") inner.shift();
  files.push(inner);
  for (let file of files) {
    await readFiles(runs2, "/Users/paulmandl/Desktop/experiments/RUNS/SMALLBANK + ");
  } */
}
/*async function readFiles(runs, fileName) {
  console.log("__________________");
  console.log("__________________");
  console.log("starting to read files for dirs starting with: " + fileName);
  console.log("__________________");
  console.log("__________________");
  let through = {};
  let latency = {};
  let transactions = {};
  let i = 0;
  for (let run of runs) {
    console.log(run);
    for (let key in run.files) {
      if (!through[key]) through[key] = 0;
      if (!latency[key]) latency[key] = 0;
      if (!transactions[key]) transactions[key] = [];
      let longestTime = 0;
      let txs = 0;
      let latencyTemp = 0;
      for (let file of run.files[key]) {
        const fileName = run.run + "/" + file;
        const content = await readFile(fileName);
        if (content.time > longestTime) longestTime = content.time;
        txs += content.success + content.fail;
        latencyTemp += parseFloat(content.latency);
        transactions[key] = transactions[key].concat(content.transactions);
      }
      i += 1;
      through[key] += txs / longestTime;
      latency[key] += latencyTemp / run.files[key].length;
    }
  }
  console.log("Throughput 25 tps: ", through["tps_25"], " tx/s");
  console.log("Throughput 50 tps: ", through["tps_50"], " tx/s");
  console.log("Throughput 75 tps: ", through["tps_75"], " tx/s");
  console.log("Throughput 100 tps: ", through["tps_100"], " tx/s");
  console.log(
    "Avg. latency 25 tps:",
    latency["tps_25"] / (i / 4),
    " ms (",
    latency["tps_25"] / (i / 4) / 1000,
    "s)"
  );
  console.log(
    "Avg. latency 50 tps: ",
    latency["tps_50"] / (i / 4),
    " ms (",
    latency["tps_50"] / (i / 4) / 1000,
    "s)"
  );
  console.log(
    "Avg. latency 75 tps: ",
    latency["tps_75"] / (i / 4),
    " ms (",
    latency["tps_75"] / (i / 4) / 1000,
    "s)"
  );
  console.log(
    "Avg. latency 100 tps: ",
    latency["tps_100"] / (i / 4),
    " ms (",
    latency["tps_100"] / (i / 4) / 1000,
    "s)"
  );
  await createFile(transactions, fileName);
}*/
async function readFiles(runs, fileName) {
  console.log("__________________");
  console.log("__________________");
  console.log("starting to read files for dirs starting with: " + fileName);
  console.log("__________________");
  console.log("__________________");
  let through = {};
  let throughNoFail = {};
  let transactions = {};
  let fail = 0;
  let success = 0;
  let notExecuted = 0;
  for (let run of runs) {
    console.log(run);
    for (let key in run.files) {
      if (!through[key]) through[key] = [];
      if (!transactions[key]) transactions[key] = [];
      if (!throughNoFail[key]) throughNoFail[key] = [];
      let time = 0;
      let throughput = 0;
      let throughputNoFail = 0;
      for (let file of run.files[key]) {
        const fileName = run.run + "/" + file;
        const content = await readFile(fileName);
        if (content.time > time) time = content.time;
        fail += content.fail;
        success += content.success;
        notExecuted += content.notExecuted;
        throughput += content.fail + content.success;
        throughputNoFail += content.success;
        transactions[key] = transactions[key].concat(content.transactions);
      }
      console.log(transactions);
      through[key].push(throughput / time);
      throughNoFail[key].push(throughputNoFail / time);
    }
  }
  for (let key in through) {
    through[key] =
      through[key].reduce((a, b) => a + b, 0) / through[key].length;
  }
  await createThroughput(through, fileName);
  await createTransactions(transactions, fileName);
  await createSuccess({ success, fail, notExecuted }, fileName);
}
start(process.argv[2]);

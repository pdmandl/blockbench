const ExcelJS = require("exceljs");
var fs = require("fs");

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
async function createSucess(success, fileName) {
  const splt = fileName.split("/");
  const tmp = splt[splt.length - 1];
  const tmps = tmp.split("_");
  tmps.pop();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");
  worksheet.columns = [
    { header: "25 tx/s", key: "tps_25", width: 15 },
    { header: "50 tx/s", key: "tps_50", width: 15 },
    { header: "75 tx/s", key: "tps_75", width: 15 },
    { header: "100 tx/s", key: "tps_100", width: 15 },
  ];
  worksheet.addRow(success);
  await workbook.xlsx.writeFile(tmps.join("_") + "_throughput" + ".xlsx");
}
async function readFile(fileName) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(fileName);
  const ws = wb.getWorksheet("Test");
  const c1 = ws.getColumn(1);
  const c2 = ws.getColumn(2);
  const c3 = ws.getColumn(3);
  const c4 = ws.getColumn(4);
  const tps25 = [];
  const tps50 = [];
  const tps75 = [];
  const tps100 = [];
  c1.eachCell((e, index) => {
    if (index > 1) tps25.push(e.value);
  });
  c2.eachCell((e, index) => {
    if (index > 1) tps50.push(e.value);
  });
  c3.eachCell((e, index) => {
    if (index > 1) tps75.push(e.value);
  });
  c4.eachCell((e, index) => {
    if (index > 1) tps100.push(e.value);
  });
  return {
    "25_tps": tps25,
    "50_tps": tps50,
    "75_tps": tps75,
    "100_tps": tps100,
  };
}
async function start(type) {
  const txEth = await readFile(
    "/Users/paulmandl/Desktop/experiments/ETH_" + type + "_throughput.xlsx"
  );
  console.log(txEth);
  const txPoly = await readFile(
    "/Users/paulmandl/Desktop/experiments/POLY_" + type + "_throughput.xlsx"
  );
  console.log(txPoly);
  const txZk = await readFile(
    "/Users/paulmandl/Desktop/experiments/ZK_" + type + "_throughput.xlsx"
  );
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");

  worksheet.columns = [
    { header: "Polygon Success 25 tx/s", key: "tps_25_eth", width: 15 },
    { header: "Polygon Fail 25 tx/s", key: "tps_25_poly", width: 15 },
    { header: "zkSync Success 25 tx/s", key: "tps_25_zk", width: 15 },
    { header: "zkSync Fail 25 tx/s", key: "tps_25_zk", width: 15 },
    { header: "Ethereum Success 25 tx/s", key: "tps_50_eth", width: 15 },
    { header: "Ethereum Fail 25 tx/s", key: "tps_50_eth", width: 15 },
    { header: "Ethereum Success 50 tx/s", key: "tps_50_eth", width: 15 },
    { header: "Ethereum Fail 50 tx/s", key: "tps_50_eth", width: 15 },
    { header: "Polygon 50 tx/s", key: "tps_50_poly", width: 15 },
    { header: "Polygon 50 tx/s", key: "tps_50_poly", width: 15 },
    { header: "zkSync 50 tx/s", key: "tps_50_zk", width: 15 },
    { header: "Ethereum 75 tx/s", key: "tps_75_eth", width: 15 },
    { header: "Polygon 75 tx/s", key: "tps_75_poly", width: 15 },
    { header: "zkSync 75 tx/s", key: "tps_75_zk", width: 15 },
    { header: "Ethereum 100 tx/s", key: "tps_100_eth", width: 15 },
    { header: "Polygon 100 tx/s", key: "tps_100_poly", width: 15 },
    { header: "zkSync 100 tx/s", key: "tps_100_zk", width: 15 },
  ];
  for (let i = 0; i < 6000; i++) {
    worksheet.addRow({
      tps_25_eth: txEth["25_tps"][i],
      tps_25_poly: txPoly["25_tps"][i],
      tps_25_zk: txZk["25_tps"][i],
      tps_50_eth: txEth["50_tps"][i],
      tps_50_poly: txPoly["50_tps"][i],
      tps_50_zk: txZk["50_tps"][i],
      tps_75_eth: txEth["75_tps"][i],
      tps_75_poly: txPoly["75_tps"][i],
      tps_75_zk: txZk["75_tps"][i],
      tps_100_eth: txEth["100_tps"][i],
      tps_100_poly: txPoly["100_tps"][i],
      tps_100_zk: txZk["100_tps"][i],
    });
    await workbook.xlsx.writeFile("Throughput_" + type + ".xlsx");
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
  let transactions = {};
  for (let run of runs) {
    for (let key in run.files) {
      if (!through[key]) through[key] = [];
      if (!transactions[key]) transactions[key] = [];
      let time = 0;
      let throughput = 0;
      for (let file of run.files[key]) {
        const fileName = run.run + "/" + file;
        const content = await readFile(fileName);
        if (content.time > time) time = content.time;
        throughput += content.fail + content.success;
        transactions[key] = transactions[key].concat(content.transactions);
      }
      through[key].push(throughput / time);
    }
  }
  for (let key in through) {
    through[key] =
      through[key].reduce((a, b) => a + b, 0) / through[key].length;
  }
  await createThroughput(through, fileName);
  await createTransactions(transactions, fileName);
}
start(process.argv[2]);

const ExcelJS = require("exceljs");

const path = "/Users/paulmandl/Downloads/blockbench-master-mehd/experiments/";

async function readFile(fileName) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(fileName);
  const ws = wb.getWorksheet("Test");
  const c1 = ws.getColumn(1);
  const c2 = ws.getColumn(2);
  const c3 = ws.getColumn(3);
  const success = [];
  const fail = [];
  const notExecuted = [];
  c1.eachCell((e, index) => {
    if (index > 1) success.push(e.value);
  });
  c2.eachCell((e, index) => {
    if (index > 1) fail.push(e.value);
  });
  c3.eachCell((e, index) => {
    if (index > 1) notExecuted.push(e.value);
  });
  return {
    success,
    fail,
    notExecuted,
  };
}
async function start(type) {
  const txEth = await readFile(path + "ETH_" + type + "_rate.xlsx");
  console.log(txEth);
  const txPoly = await readFile(path + "POLY_" + type + "_rate.xlsx");
  console.log(txPoly);
  const txZk = await readFile(path + "ZK_" + type + "_rate.xlsx");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");

  worksheet.columns = [
    { header: "Ethereum Success", key: "success_eth", width: 15 },
    { header: "Ethereum Fail", key: "fail_eth", width: 15 },
    { header: "Ethereum No Answer", key: "noA_eth", width: 15 },
    { header: "Polygon Success", key: "success_poly", width: 15 },
    { header: "Polygon Fail", key: "fail_poly", width: 15 },
    { header: "Polygon No Answer", key: "noA_poly", width: 15 },
    { header: "zkSync Success", key: "success_zk", width: 15 },
    { header: "zkSync Fail", key: "fail_zk", width: 15 },
    { header: "zkSync No Answer", key: "noA_zk", width: 15 },
  ];
  worksheet.addRow({
    success_eth: txEth["success"][0],
    fail_eth: txEth["fail"][0],
    noA_eth: txEth["notExecuted"][0],
    success_poly: txPoly["success"][0],
    fail_poly: txPoly["fail"][0],
    noA_poly: txPoly["notExecuted"][0],
    success_zk: txZk["success"][0],
    fail_zk: txZk["fail"][0],
    noA_zk: txZk["notExecuted"][0],
  });
  await workbook.xlsx.writeFile("SuccessRate_" + type + ".xlsx");
}
start(process.argv[2]);

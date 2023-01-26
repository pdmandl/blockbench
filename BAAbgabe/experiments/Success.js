const ExcelJS = require("exceljs");

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
    "/Users/paulmandl/Desktop/experiments/ETH_" + type + "_rate.xlsx"
  );
  console.log(txEth);
  const txPoly = await readFile(
    "/Users/paulmandl/Desktop/experiments/POLY_" + type + "_rate.xlsx"
  );
  console.log(txPoly);
  const txZk = await readFile(
    "/Users/paulmandl/Desktop/experiments/ZK_" + type + "_rate.xlsx"
  );
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test");

  worksheet.columns = [
    { header: "Ethereum Success", key: "success_eth", width: 15 },
    { header: "Ethereum Fail", key: "fail_eth", width: 15 },
    { header: "Polygon Success", key: "success_poly", width: 15 },
    { header: "Polygon Fail", key: "fail_poly", width: 15 },
    { header: "zkSync Success", key: "success_zk", width: 15 },
    { header: "zkSync Fail", key: "fail_zk", width: 15 },
  ];
  worksheet.addRow({
    success_eth: txEth["success"][i],
    fail_eth: txEth["fail"][i],
    success_poly: txPoly["success"][i],
    fail_poly: txPoly["fail"][i],
    success_zk: txZk["success"][i],
    fail_zk: txZk["fail"][i],
  });
  await workbook.xlsx.writeFile("SuccessRate_" + type + ".xlsx");
}
start(process.argv[2]);

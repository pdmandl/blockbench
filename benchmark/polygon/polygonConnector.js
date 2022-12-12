const Tx = require("ethereumjs-tx").Transaction;
const ethers = require("ethers");

let url = "http://192.168.4.150:8545";
let provider = new ethers.providers.JsonRpcProvider(url);
const sendEths = async ({
  to,
  from,
  fromPrivateKey,
  value,
  gasPrice,
  gasLimit = ethers.utils.hexlify(21000),
}) => {
  const txCount = await provider.getTransactionCount(from);
  // build the transaction
  const tx = new Tx({
    nonce: ethers.utils.hexlify(txCount),
    to,
    value: ethers.utils.parseEther(value).toHexString(),
    gasLimit,
    gasPrice,
  });
  // sign the transaction
  tx.sign(Buffer.from(fromPrivateKey, "hex"));
  // send the transaction
  const { hash } = await provider.sendTransaction(
    "0x" + tx.serialize().toString("hex")
  );
  let test = await provider.waitForTransaction(hash);
  console.log(test);
};
sendEths({
  to: "0x0308CBccd5E1a570C2B5797456fb56bA510713FB",
  from: "0x4873a45c059E564a7E091A4D4f558c63F49F1136",
  fromPrivateKey:
    "6ea44ded1928c25f5eb73e5240937379f451c7aaef49d32c065f78dc0cbf6da7",
  value: "1",
  gasPrice: "0x100",
});

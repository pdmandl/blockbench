const fs = require("fs");
fs.writeFile("Output.txt", "", function () {
  console.log("done");
});
// TODO: Enable the contract you need for your benchmark
// var Kvstore = artifacts.require("Kvstore");
// var Smallbank = artifacts.require("Smallbank");
var NftMint = artifacts.require("NftMint");

module.exports = function (deployer) {
  // deployment steps
  /*deployer.deploy(Kvstore).then(() => {
    fs.appendFile("Output.txt", `\n${Kvstore.address}`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    });
  });
  deployer.deploy(Smallbank, { gas: 5000000 }).then(() => {
    fs.appendFile("Output.txt", `\n${Smallbank.address}`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    });
  });*/
  deployer.deploy(NftMint, { gas: 5000000 }).then(() => {
    fs.appendFile("Output.txt", `\n${NftMint.address}`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    });
  });
};

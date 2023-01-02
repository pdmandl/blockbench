const fs = require("fs");
fs.writeFile("Output.txt", "", function () {
  console.log("done");
});

// var Kvstore = artifacts.require("Kvstore");
// TODO: Enable for smallbank
var Smallbank = artifacts.require("Smallbank");

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
  });*/
  deployer.deploy(Smallbank, { gas: 5000000 }).then(() => {
    fs.appendFile("Output.txt", `\n${Smallbank.address}`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    });
  });
};

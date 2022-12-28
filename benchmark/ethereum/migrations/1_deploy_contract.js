const fs = require("fs");

var Kvstore = artifacts.require("Kvstore");
var Smallbank = artifacts.require("Smallbank");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Kvstore).then(() => {
    fs.appendFile("Output.txt", Kvstore.address, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    });
  });
  deployer.deploy(Smallbank, { gas: 5000000 }).then(() => {
    fs.appendFile("Output.txt", Smallbank.address, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    });
  });
};

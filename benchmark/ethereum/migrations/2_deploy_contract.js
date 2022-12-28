var Kvstore = artifacts.require("Kvstore");
var Smallbank = artifacts.require("Smallbank");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Kvstore);
  deployer.deploy(Smallbank);
};

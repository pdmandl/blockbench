var Kvstore = artifacts.require("Kvstore");
var Smallbank = artifacts.require("Smallbank");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Kvstore).then(() => console.log(Kvstore.address));
  deployer
    .deploy(Smallbank, { gas: 5000000 })
    .then(() => console.log(Smallbank.address));
};

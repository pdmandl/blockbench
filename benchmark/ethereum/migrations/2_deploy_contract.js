var KVStore = artifacts.require("KVStore");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(KVStore);
};

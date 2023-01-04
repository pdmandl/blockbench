// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { Wallet, Provider, Contract } = require("zksync-web3");
const { Deployer } = require("@matterlabs/hardhat-zksync-deploy");

async function main(deployer) {
  const artifact = await deployer.loadArtifact("Greeter");
  const res = await deployer.deploy(artifact, ["Hi"]);
}
const provider = Provider.getDefaultProvider();
const wallet = new Wallet(RICH_WALLET_PK, provider);
const deployer = new Deployer(hre, wallet);
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(deployer).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

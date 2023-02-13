// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const CharityContract = await ethers.getContractFactory("Charity");
  console.log("Deploying Charity...");
  const deployedCharityContract = await upgrades.deployProxy(CharityContract, [42], { initializer: "store" });
  await deployedCharityContract.deployed();
  console.log("Charity Contract deployed to:", deployedCharityContract.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
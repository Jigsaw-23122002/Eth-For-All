// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const upgradeCharity = await ethers.getContractFactory("Charity");
  const upgradedCharity = await upgrades.upgradeProxy(
    process.env.CONTRACT_ADDRESS,
    upgradeCharity
  );
  console.log("Contract upgraded on the same address");
}

main();

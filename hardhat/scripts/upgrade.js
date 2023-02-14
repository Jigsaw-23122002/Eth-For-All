// scripts/upgrade_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const CharityV2 = await ethers.getContractFactory("Charity");
  console.log("Upgrading Charity Contract...");
  await upgrades.upgradeProxy(
    "0xCAA919fd1b696cc72b9ED654dE08A412801f2a65",
    CharityV2
  );
  console.log("Charity Contract upgraded");
}

main();

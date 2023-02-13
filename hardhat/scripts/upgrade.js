// scripts/upgrade_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const CharityV2 = await ethers.getContractFactory('Charity');
  console.log('Upgrading Charity Contract...');
  await upgrades.upgradeProxy('deployedContactAddress', CharityV2);
  console.log('Charity Contract upgraded');
}

main();
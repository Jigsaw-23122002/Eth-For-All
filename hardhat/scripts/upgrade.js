// // scripts/upgrade_box.js
// const { ethers, upgrades } = require('hardhat');

// async function main () {
//   const CharityV2 = await ethers.getContractFactory('Charity');
//   console.log('Upgrading Charity Contract...');
//   await upgrades.upgradeProxy('0xCAA919fd1b696cc72b9ED654dE08A412801f2a65', CharityV2);
//   console.log('Charity Contract upgraded');
// }

// main();
const { ethers } = require("hardhat");

async function main() {
  const whiteListContract = await ethers.getContractFactory("Charity");

  const deployedWhiteListContract = await whiteListContract.deploy();

  await deployedWhiteListContract.deployed();

  console.log(" Contract Address", deployedWhiteListContract.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

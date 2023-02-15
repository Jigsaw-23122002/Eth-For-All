// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Charity = await ethers.getContractFactory("Charity");
  const charity = await upgrades.deployProxy(Charity, [42]);
  await charity.deployed();
  console.log("Contract deployed on address : ", charity.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

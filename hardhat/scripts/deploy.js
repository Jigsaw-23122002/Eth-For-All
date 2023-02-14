const { ethers, upgrades } = require("hardhat");

async function main() {
  console.log("starting to deploy the contract");
  const Charity = await ethers.getContractFactory("Charity");
  console.log("contract loaded ");

  const charity = await upgrades.deployProxy(Charity);
  console.log("instance of contract created to deploy");

  await charity.deployed();
  console.log("Charity Contract deployed on address : ", charity.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

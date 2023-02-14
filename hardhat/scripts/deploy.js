const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const charityContract = await ethers.getContractFactory("Charity");
  const deployedCharityContract = await charityContract.deploy();
  await deployedCharityContract.deployed();
  console.log("Charity Contract Address : ", deployedCharityContract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

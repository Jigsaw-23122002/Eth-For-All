const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const registerOrgContract = await ethers.getContractFactory("Register");
  const deployedRegisterOrgContract = await registerOrgContract.deploy();
  await deployedRegisterOrgContract.deployed();
  console.log("Contract Address: ", deployedRegisterOrgContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});

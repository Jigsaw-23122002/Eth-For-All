const { ethers } = require("hardhat");

async function main() {
  const registerOrgContract = await ethers.getContractFactory("Register");
  const deployedRegisterOrgContract = await registerOrgContract.deploy();
  await deployedRegisterOrgContract.deployed();
  console.log("Contract Address: ", deployedRegisterOrgContract.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

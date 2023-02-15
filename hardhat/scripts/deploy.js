const { ethers } = require("hardhat");
<<<<<<< HEAD

async function main() {
  const registerOrgContract = await ethers.getContractFactory("Charity");
  const deployedRegisterOrgContract = await registerOrgContract.deploy();
  await deployedRegisterOrgContract.deployed();
  console.log("Contract Address: ", deployedRegisterOrgContract.address);

}

=======
require("dotenv").config({ path: ".env" });

async function main() {
  const charityContract = await ethers.getContractFactory("Charity");
  const deployedCharityContract = await charityContract.deploy();
  await deployedCharityContract.deployed();
  console.log("Charity Contract Address : ", deployedCharityContract.address);
}
>>>>>>> eb580e417b6348f51092b1329bd049c957a8f618
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

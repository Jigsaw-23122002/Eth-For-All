// const { ethers } = require("hardhat");

// async function main() {
//   const whiteListContract = await ethers.getContractFactory("Charity");

//   const deployedWhiteListContract = await whiteListContract.deploy();

//   await deployedWhiteListContract.deployed();

//   console.log("Charity Contract Address", deployedWhiteListContract.address);
// }

// main()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   });

const { ethers } = require("hardhat");

async function main() {
  const charityContract = await ethers.getContractFactory("Charity");

  const deployedcharityContract = await charityContract.deploy();

  await deployedcharityContract.deployed();

  console.log(
    "Deployed Charity Contract Address",
    deployedCharityContract.address
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const GOERLI_PVT_KEY = process.env.GOERLI_PVT_KEY;
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [GOERLI_PVT_KEY],
      chainId: 5,
      allowUnlimitedContractSize: true,
    },
  },
};

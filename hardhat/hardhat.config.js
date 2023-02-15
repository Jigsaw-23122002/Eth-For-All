require("@nomicfoundation/hardhat-toolbox");
<<<<<<< HEAD
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
=======
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
>>>>>>> eb580e417b6348f51092b1329bd049c957a8f618

module.exports = {
<<<<<<< HEAD
  solidity: "0.8.9",
  mocha: {
    timeout: 100000000
  },
  networks: {
    goerli: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
=======
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
      allowUnlimitedContractSize: true,
    },
  },
};
>>>>>>> eb580e417b6348f51092b1329bd049c957a8f618

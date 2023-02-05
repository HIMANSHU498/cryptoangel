const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "./.env.local" });
task("accounts", "Prints list of all accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const privateKey = process.env.REACT_APP_PUBLIC_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ethereum",
  networks: {
    hardhat: {},
    ethereum: {
      url: process.env.REACT_APP_PUBLIC_RPC_URL,
      accounts: [privateKey],
    },
  },
};

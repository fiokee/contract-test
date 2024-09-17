import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url: process.env.ALCHEMY_TESTNET_URL,
      accounts: [`0x${process.env.TESTNET_PRIVATE_KEY}`],
    },
  },
};

export default config;

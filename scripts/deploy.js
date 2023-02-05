const hre = require("hardhat");

async function main() {
  const fundraiserFactory = await hre.ethers.getContractFactory(
    "fundingRequest"
  );
  const factory = await fundraiserFactory.deploy();

  await factory.deployed();

  console.log("factory deployed to:", factory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

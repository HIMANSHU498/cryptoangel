const fundingRequest = require("./src/artifacts/contracts/Fundraiser.sol/fundingRequest.json");
const ethers = require("ethers");
require("dotenv").config({ path: "./.env.local" });

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_PUBLIC_RPC_URL
  );
  const contract = new ethers.Contract(
    process.env.REACT_APP_PUBLIC_ADDRESS,
    fundingRequest.abi,
    provider
  );
  const getDeployed = contract.filters.requestCreated();
  let events = await contract.queryFilter(getDeployed);
  let event = events.reverse();
  console.log(events);
};
main();

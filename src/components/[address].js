import React, { useEffect, useState } from "react";
import "./Detail.css";
import { ethers } from "ethers";
import fundingRequest from "./../artifacts/contracts/Fundraiser.sol/fundingRequest.json";
import Fundraiser from "./../artifacts/contracts/Fundraiser.sol/Fundraiser.json";
import "./address.css";
const Detail = (props) => {
  const [loadAllData, setloadAllData] = useState([]);
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    async function fetchAllData() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        provider
      );

      //all data
      const getAllData = contract.filters.requestCreated();
      const All = await contract.queryFilter(getAllData);

      const allData = All.map((e) => {
        return {
          address: e.args.fundingAddress.toString(),
        };
      });
      setloadAllData(allData);
    }
    fetchAllData();
  });

  useEffect(() => {
    async function fetchData(context) {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        props.address,
        Fundraiser.abi,
        provider
      );

      const title = await contract.title();
      const requiredAmount = await contract.requiredAmount();
      const image = await contract.image();
      const storyUrl = await contract.story();
      const owner = await contract.owner();

      const investment = contract.filters.invested();
      const AllInvestment = await contract.queryFilter(investment);

      // const Data = {
      //   address: loadAllData,
      //   title,
      //   requiredAmount: ethers.utils.formatEther(requiredAmount),
      //   image,
      //   receivedAmount: ethers.utils.formatEther(receivedAmount),
      //   storyUrl,
      //   owner,
      // };

      // const investmentData = AllInvestment.map((e) => {
      //   return {
      //     investor: e.args.investor,
      //     amount: ethers.utils.formatEther(e.args.amount),
      //     timestamp: parseInt(e.args.timestamp),
      //   };
      // });
      console.log(contract);
      // return {
      //   props: {
      //     Data,
      //     investmentData,
      //   },
      //   revalidate: 10,
      // };
    }
    fetchData();
  });

  return (
    <div className="detail-wrapper">
      <div className="detail-left">
        <h1 className="detail-title">Aptos</h1>
        <div className="">
          <img
            src="https://img.capital.com/imgs/articles/1200x627x1/shutterstock_2201047041.jpg"
            alt=""
            className="detail-img"
          />
        </div>
        <span className="detail-text">
          NFT marketplace based on Avalanche blockchain
        </span>
      </div>
      <div className="detail-right">
        <div className="funding-data">
          <div className="detail-fund-data">
            <div className="required-funds">Required Funds</div>
            <div className="required-funds">100 $</div>
          </div>
          <div className="detail-fund-data">
            <div className="required-funds">Received Funds</div>
            <div className="required-funds">50 $</div>
          </div>
        </div>
        <div className="funding-section">
          <input
            type="number"
            className="detail-input"
            placeholder="Enter amount to invest"
          />
          <button className="invest-btn">Invest</button>
        </div>
        <div className="funded">
          <div className="history-funds">
            <div className="history-title">Recent Transactions</div>
            <div className="recent-data">
              <div className="recent-owner">0x01...5b3d</div>
              <div className="recent-amount">50$</div>
              <div className="recent-time">04/11/2022, 17:28 PM</div>
            </div>
          </div>
          <div className="history-funds">
            <div className="history-title">My recent transactions</div>
            <div className="recent-data">
              <div className="recent-owner">0201...5b3d</div>
              <div className="recent-amount">50$</div>
              <div className="recent-time">04/11/2022, 17:28 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

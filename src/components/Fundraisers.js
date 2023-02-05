import React, { useState } from "react";
import "./Fundraisers.css";
import {
  AccountBox,
  AddReaction,
  Event,
  FilterAlt,
  Paid,
} from "@mui/icons-material";
import { ethers } from "ethers";
import fundingRequest from "./../artifacts/contracts/Fundraiser.sol/fundingRequest.json";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Detail from "./[address]";

const Fundraisers = () => {
  const [loadAllData, setloadAllData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loadWeb3Data, setloadWeb3Data] = useState([]);
  const [loadMetaverseData, setloadMetaverseData] = useState([]);
  const [loadDefiData, setloadDefiData] = useState([]);
  const [loadNFTData, setloadNFTData] = useState([]);
  const [loadCryptoData, setloadCryptoData] = useState([]);
  const [addressData, setAddressData] = useState([]);

  console.log(addressData);
  //allData
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
          title: e.args.title,
          image: e.args.imgurl,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: parseInt(e.args.requiredAmount),
          address: e.args.fundingAddress,
        };
      });
      setloadAllData(allData);
    }
    fetchAllData();
  });
  useEffect(() => {
    async function address() {
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

      const allAddress = All.map((e) => {
        return {
          address: e.args.fundingAddress,
        };
      });
      setAddressData(allAddress);
    }
    address();
  });
  //web3 data
  useEffect(() => {
    async function fetchWeb3Data() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        provider
      );

      //all data
      const getWeb3Data = contract.filters.requestCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "Web3"
      );
      const Web3 = await contract.queryFilter(getWeb3Data);

      const Web3Data = Web3.map((e) => {
        return {
          title: e.args.title,
          image: e.args.imgurl,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: parseInt(e.args.requiredAmount),
          address: e.args.fundingAddress,
        };
      });
      setloadWeb3Data(Web3Data);
    }
    fetchWeb3Data();
  });

  //metaverse data
  useEffect(() => {
    async function fetchMetaverseData() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        provider
      );

      //Metaverse category data
      const getMetaverseData = contract.filters.requestCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "Metaverse"
      );
      const Metaverse = await contract.queryFilter(getMetaverseData);
      const MetaverseData = Metaverse.map((e) => {
        return {
          title: e.args.title,
          image: e.args.imgurl,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: parseInt(e.args.requiredAmount),
          address: e.args.fundingAddress,
        };
      });
      setloadMetaverseData(MetaverseData);
    }
    fetchMetaverseData();
  });
  //Defi data
  useEffect(() => {
    async function fetchDefiData() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        provider
      );

      const getDefiData = contract.filters.requestCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "Defi"
      );
      const Defi = await contract.queryFilter(getDefiData);

      const DefiData = Defi.map((e) => {
        return {
          title: e.args.title,
          image: e.args.imgurl,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: parseInt(e.args.requiredAmount),
          address: e.args.fundingAddress,
        };
      });
      setloadDefiData(DefiData);
    }
    fetchDefiData();
  });

  //NFT DATA

  useEffect(() => {
    async function fetchNFTData() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        provider
      );

      const getNFTData = contract.filters.requestCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "NFT"
      );

      const NFT = await contract.queryFilter(getNFTData);
      const NFTData = NFT.map((e) => {
        return {
          title: e.args.title,
          image: e.args.imgurl,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: parseInt(e.args.requiredAmount),
          address: e.args.fundingAddress,
        };
      });
      setloadNFTData(NFTData);
    }
    fetchNFTData();
  });

  //cryptocurrency data
  useEffect(() => {
    async function fetchCryptoData() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        provider
      );

      //Cryptocurrency data
      const getCryptoData = contract.filters.requestCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "Crypto"
      );
      const cryptoCurrency = await contract.queryFilter(getCryptoData);
      const cryptoCurrencyData = cryptoCurrency.map((e) => {
        return {
          title: e.args.title,
          image: e.args.imgurl,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: parseInt(e.args.requiredAmount),
          address: e.args.fundingAddress,
        };
      });
      setloadCryptoData(cryptoCurrencyData);
    }
    fetchCryptoData();
  });
  return (
    <>
      j
      <div className="main-header">
        <div className="filter">
          <FilterAlt style={{ fontsize: 40 }} />
          &nbsp;&nbsp;
          <div className="category" value={loadWeb3Data}>
            Web3
          </div>
          <div className="category" value={loadDefiData}>
            Defi
          </div>
          <div className="category" value={loadNFTData}>
            NFT
          </div>
          <div className="category" value={loadMetaverseData}>
            Metaverse
          </div>
          <div className="category" value={loadCryptoData}>
            Cryptocurrency
          </div>
        </div>
        <div className="cardWrapper">
          {loadAllData.map((e) => {
            return (
              <div className="card">
                <div className="card-img">
                  <img
                    src={"https://cryptoangel.infura-ipfs.io/ipfs/" + e.image}
                    alt=""
                    layout="fill"
                    className="card-img"
                  />
                </div>
                <div className="card-title">{e.title}</div>
                <div className="card-data">
                  <span className="text-style">
                    Owner <AccountBox />
                  </span>
                  <span className="text-style">
                    {e.address.slice(0, 5)}...{e.address.slice(38)}
                  </span>
                </div>
                <div className="card-data">
                  <span className="text-style">
                    Amount <Paid />
                  </span>
                  <span className="text-style">{e.amount} $</span>
                </div>
                <div className="card-data">
                  <span>
                    <Event />
                  </span>
                  <span className="text-style">
                    {new Date(e.timeStamp * 1000).toLocaleString()}
                  </span>
                </div>
                <div className="btn-style">
                  <Link to="/Detail">
                    <button className="card-btn">Go to Campaign</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Fundraisers;

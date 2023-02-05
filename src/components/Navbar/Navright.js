import React, { useContext, useState } from "react";
import "./Navright.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { App } from "../Layouts";
import { ethers } from "ethers";
//wallet network
const networks = {
  Ethereum: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Goerli test network",
    nativeCurrency: {
      name: "ETH",
      symbol: "GoerliETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3/"],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
  },
};

const Navright = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const Provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    const account = Provider.getSigner();
    const Address = await account.getAddress();
    setAddress(Address);
    const Balance = ethers.utils.formatEther(await account.getBalance());
    setBalance(Balance);
  };
  const toggleTheme = useContext(App);
  return (
    <div className="navright">
      <div className="wallet" onClick={connectWallet}>
        {address === "" ? (
          <div>Connect Wallet</div>
        ) : (
          <div className="address">
            {address.slice(0, 4)}...{address.slice(38, 42)} (
            {balance.slice(0, 4)} ETH)
          </div>
        )}
      </div>
      <div className="mode">
        {toggleTheme.theme === "light" ? (
          <DarkModeIcon onClick={toggleTheme.changeTheme} />
        ) : (
          <WbSunnyIcon onClick={toggleTheme.changeTheme} />
        )}
      </div>
    </div>
  );
};

export default Navright;

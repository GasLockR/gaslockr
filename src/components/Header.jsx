import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const onConnectWallet = () => {
    setIsConnected(true);
    setWalletAddress("0xAbC12345dEf67890GhI12345jKl67890"); // Mock wallet address
  };

  const onClaimNow = () => {
    navigate("/claims");
  };

  const goToHome = () => {
    navigate("/");
  };

  const displayAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  return (
    <header className="bg-indigo-600">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div onClick={goToHome} className="cursor-pointer">
            <h1 className="text-white text-2xl font-bold">GasLockR</h1>
          </div>
          <div className="flex items-center">
            {isConnected && (
              <button
                onClick={onClaimNow}
                className="ml-4 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Claim Now
              </button>
            )}
            {!isConnected ? (
              <button
                onClick={onConnectWallet}
                className="ml-4 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="ml-4 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                {displayAddress(walletAddress)}
              </button>
            )}
            <div className="ml-4">
              <Select
                defaultValue="ethereum"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="ethereum">Ethereum</Option>
                <Option value="binance-smart-chain">Binance Smart Chain</Option>
                <Option value="polygon">Polygon</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

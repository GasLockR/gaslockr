import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { Modal } from "antd";
import useWeb3Provider from "./hooks/useWeb3Provider";

const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();
  const { provider, signer, contract } = useWeb3Provider();
  const [isConnected, setIsConnected] = useState(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    return storedAddress ? true : false;
  });
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const address = localStorage.getItem("walletAddress");
    if (address) {
      setIsConnected(true);
      setWalletAddress(address);
    }
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      setWalletAddress("");
      localStorage.removeItem("walletAddress");
    } else {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setIsConnected(true);
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);
    }
  };

  const onConnectWallet = async () => {
    if (!window.ethereum) {
      alert("Please Install MetaMask！");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      const signature = await provider
        .getSigner(account)
        .signMessage("GasLockR Authentication");
      setIsConnected(true);
      setWalletAddress(account);

      localStorage.setItem("walletAddress", account);
      localStorage.setItem("signature", signature);

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
          handleDisconnect();
        } else {
          const newAccount = accounts[0];
          const newSignature = await provider
            .getSigner(newAccount)
            .signMessage("GasLockR Authentication");
          setIsConnected(true);
          setWalletAddress(newAccount);

          localStorage.setItem("walletAddress", newAccount);
          localStorage.setItem("signature", newSignature);
        }
      });
    } catch (error) {
      console.error("Error connecting wallet: ", error);
    }
  };

  const handleDisconnect = () => {
    setIsModalVisible(true);
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
                defaultValue="Goeril"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="goeril">Goeril</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Disconnect Wallet"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <div>
            <button
              className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              onClick={() => {
                if (window.ethereum) {
                  window.ethereum.removeListener(
                    "accountsChanged",
                    handleAccountsChanged
                  );
                }
                setIsConnected(false);
                setWalletAddress("");
                localStorage.removeItem("walletAddress");
                localStorage.removeItem("signature");
                setIsModalVisible(false);
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-600 focus:outline-none focus:shadow-outline"
              onClick={() => {
                setIsModalVisible(false);
              }}
            >
              Cancel
            </button>
          </div>
        }
      >
        Are you sure you want to disconnect your wallet?
      </Modal>
    </header>
  );
};

export default Header;

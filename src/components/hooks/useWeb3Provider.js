import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contracABI from "../../contractABI.json";
import contractAddress from "../../contractAddress.json";

const useWeb3Provider = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            const signerInstance = web3Provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contracABI, signerInstance);

            setProvider(web3Provider);
            setSigner(signerInstance);
            setContract(contractInstance);
        }
    }, []);

    return { provider, signer, contract };
};

export default useWeb3Provider;

import { createContext, useEffect, useState } from "react";
import { MetaMaskProvider, useSDK } from '@metamask/sdk-react';
import proxyInterface from "../../../backend/build/contracts/Proxy.json";
import registryInterface from "../../../backend/build/contracts/Registry.json";
import { ethers } from "ethers";
import { Password } from "../testData";

interface EthContextValue {
  activeTagNumber: number;
  setActiveTagNumber?: React.Dispatch<React.SetStateAction<number>>;
  createRegistry: () => void;
  deleteRegistry: () => void;
  getPasswords: () => Promise<Password[]>;
  batchUpdate: (adds: Password[], deletes: number[], updates: Password[]) => void;
  account?: string
}
const proxyAddr = "0xE92D556cf4FEd679EEf993E30e5b28e6600DFBf4"

const EthContext = createContext<EthContextValue>({
  activeTagNumber: 0,
  createRegistry: () => { },
  deleteRegistry: () => { },
  getPasswords: () => { return new Promise((res) => { res([]) }) },
  batchUpdate: () => { }
});

const EthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTagNumber, setActiveTagNumber] = useState(0);

  const { sdk, account, provider, } = useSDK();

  useEffect(() => {
    console.log("accout", account)
  }, [account])


  const localchain = new ethers.Network("localhost", 1337)

  const createRegistry = async () => {
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum, localchain);
      const signer = await p.getSigner();
      const proxyContract = new ethers.Contract(proxyAddr, proxyInterface.abi, signer)
      await proxyContract.createRegistry();
    }
  }

  const deleteRegistry = async () => {
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum, localchain);
      const signer = await p.getSigner();
      const proxyContract = new ethers.Contract(proxyAddr, proxyInterface.abi, signer)
      await proxyContract.deleteRegistry();
    }
  }

  const getPasswords = async () => {
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum, localchain);
      const signer = await p.getSigner();
      const proxyContract = new ethers.Contract(proxyAddr, proxyInterface.abi, signer)
      const registryAddress = await proxyContract.getRegistryAddress();
      const registryContract = new ethers.Contract(registryAddress, registryInterface.abi, signer);
      const passwords = await registryContract.getPasswords();
      return passwords
    }
  }

  const batchUpdate = async (adds: Password[], deletes: number[], updates: Password[]) => {
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum, localchain);
      const signer = await p.getSigner();
      const proxyContract = new ethers.Contract(proxyAddr, proxyInterface.abi, signer)
      const registryAddress = await proxyContract.getRegistryAddress();
      const registryContract = new ethers.Contract(registryAddress, registryInterface.abi, signer);
      await registryContract.batchUpdate(adds, deletes, updates)
    }
  }

  async function checkChain() {
    await provider?.request({
      "method": "wallet_switchEthereumChain",
      "params": [
        {
          "chainId": "0x64"
        }
      ]
    });
  }


  return (
    <EthContext.Provider value={{
      activeTagNumber,
      setActiveTagNumber,
      createRegistry,
      deleteRegistry,
      getPasswords,
      batchUpdate,
      account
    }}>
      {children}
    </EthContext.Provider>
  );
};

export { EthContext, EthContextProvider };

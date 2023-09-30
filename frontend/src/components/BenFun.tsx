import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useRef, useState } from "react";
import proxyInterface from '../../../backend/build/contracts/Proxy.json'
import registryInterface from '../../../backend/build/contracts/Registry.json'


import { createPublicClient, defineChain, http, createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

type Password = {
  id: number
  nickname: string
  password: string
  username: string
  domain: string
  tag: number
}

const proxyAddr = "0xf257a986b4E211047c55972716832287d351F9C8"

const localchain = defineChain({
  id: 1337,
  name: 'Local',
  network: 'local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
      // webSocket: ['wss://rpc.zora.energy'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
      // webSocket: ['wss://rpc.zora.energy'],
    },
  },
})
const publicClient = createPublicClient({
  chain: localchain,
  transport: http()
})
const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})
const [account] = await walletClient.getAddresses()
console.log("my account", account)

const networkData = proxyInterface.networks[1337];

const BenFun = () => {

  // const { sdk, provider, chainId } = useSDK();
  const onboarding = new MetaMaskOnboarding();
  const hasMetaMask = useRef(false)

  useEffect(() => {
    hasMetaMask.current = isMetaMaskInstalled()
  }, []);

  return (
    <div className="flex w-full flex-col h-10 bg-base-300">
      <button onClick={onClickConnect}>Connect to Metamask</button>
      <div>{account}</div>
      <button onClick={createRegistry}>Create Registry</button>
      <button onClick={deleteRegistry}>Delete Registry</button>
      <button onClick={addPassword}>Add Password</button>
      <button onClick={getRegistryAddress}>Get Registry Address</button>
      <button onClick={getPasswords}>Get Passwords</button>
      <button onClick={updatePassword}>Update Password</button>
      <button onClick={deletePassword}>Delete Password</button>
    </div>
  );

  async function createRegistry() {
    const request = await walletClient.writeContract({
      account,
      address: networkData.address,
      abi: proxyInterface.abi,
      functionName: 'createRegistry',
      chain: localchain
    })
    console.log(request);
    await walletClient.writeContract(request);

  }

  async function deleteRegistry() {
    const request = await walletClient.writeContract({
      account,
      address: proxyAddr,
      abi: proxyInterface.abi,
      functionName: 'deleteRegistry',
      // chain: localchain
    })
    console.log("request", request);

    await walletClient.writeContract(request);
  }

  async function getRegistryAddress(): Promise<`0x${string}` | undefined> {
    const data = await publicClient.readContract({
      address: proxyAddr,
      abi: proxyInterface.abi,
      functionName: 'getRegistryAddress',
      account,
    })
    return data?.toString();
  }

  async function addPassword(p: Password) {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const request = await walletClient.writeContract({
      account,
      address: registryAddress,
      abi: registryInterface.abi,
      functionName: 'addPassword',
      // chain: localchain,
      args: [p.nickname, p.password, p.username, p.domain, p.tag]
    })
    console.log(request);
    await walletClient.writeContract(request);
  }

  async function deletePassword() {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const request = await walletClient.writeContract({
      account,
      address: registryAddress,
      abi: registryInterface.abi,
      functionName: 'deletePassword',
      // chain: localchain,
      args: [0]
    })
    console.log(request);
    await walletClient.writeContract(request);
  }

  async function getPasswords() {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const data = await publicClient.readContract({
      address: registryAddress,
      abi: registryInterface.abi,
      functionName: 'getPasswords',
      account,
      // chain: localchain
    })
    console.log(data)
  }

  async function updatePassword(p: Password) {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const data = await walletClient.writeContract({
      address: registryAddress,
      abi: registryInterface.abi,
      functionName: 'updatePassword',
      account,
      // chain: localchain,
      args: [p.id, p.nickname, p.password, p.username, p.domain, p.tag]
    })
    console.log(data)
  }



  async function onClickConnect() {
    try {
      if (hasMetaMask.current === false) { // if false then chrome tab will open for you to download
        onboarding.startOnboarding();
      }
      else { // connects user wallet
        await window.ethereum?.request({ method: 'eth_requestAccounts' });
      }

    } catch (error) {
      console.error(error);
    }
  };

  function isMetaMaskInstalled() {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask); // returns false if metamask is not installed; else true
  };


};

export default BenFun;

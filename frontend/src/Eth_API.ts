// import MetaMaskOnboarding from "@metamask/onboarding";
// import { useEffect, useRef, useState } from "react";
// import proxyInterface from "../../backend/build/contracts/Proxy.json";
// import registryInterface from "../../backend/build/contracts/Registry.json";
// import Web3, { HttpProvider } from 'web3';


// const proxyAddress = "0x04876Fcc7788F9d9916870222A93d00fE5B81a89";
// // import {
// //   createPublicClient,
// //   defineChain,
// //   http,
// //   createWalletClient,
// //   custom,
// //   webSocket,
// // } from "viem";
// // import { mainnet, goerli } from "viem/chains";
// import { Password } from "./testData";
// import { useSDK } from "@metamask/sdk-react";

// // const CURRENT_CHAIN = goerli;
// // const GOERLI_PROXY_ADDRESS = "0x1a93B8aCbc885DE5F7517Ff0b06698807f227579";
// // const publicClient = createPublicClient({
// //   chain: CURRENT_CHAIN,
// //   transport: http(),
// // });

// // const walletClient = createWalletClient({
// //   chain: CURRENT_CHAIN,
// //   transport: custom(window.ethereum),
// // });

// export const [account] = "0xdC905C74bCEA301c37D968B9CF12dc6a0bA4A293"//await walletClient.getAddresses();

// export async function batchUpdate(
//   adds: Password[],
//   deletes: number[],
//   updates: Password[]
// ) {
//   // const registryAddress = await getRegistryAddress();
//   // const gas = await publicClient.estimateContractGas({
//   //   account,
//   //   address: registryAddress,
//   //   abi: registryInterface.abi,
//   //   functionName: "batchUpdate",
//   //   args: [adds, deletes, updates],
//   // });
//   // const gasPrice = await publicClient.getGasPrice();
//   // const request = await walletClient.writeContract({
//   //   account,
//   //   address: registryAddress,
//   //   abi: registryInterface.abi,
//   //   functionName: "batchUpdate",
//   //   gasPrice,
//   //   gas,
//   //   args: [adds, deletes, updates],
//   // });
//   // await walletClient.writeContract(request);
// }

// export async function createRegistry() {
//   // const { sdk, connected, connecting, provider, chainId } = useSDK();
//   // console.log(connected)
//   // const web3 = new Web3(window.provider);
//   // const contract = new web3.eth.Contract(proxyInterface.abi, proxyAddress);
//   // const gas = await contract.methods.createRegistry().estimateGas();
//   // const gasPrice = await web3.eth.getGasPrice();

//   // const a = await contract.methods.createRegistry().call({
//   //   from: account,
//   //   gas: gas.toString(),
//   //   gasPrice: gasPrice.toString()
//   // })
//   // console.log("a: ", a);

// }

// export async function deleteRegistry() {
//   // const gas = await publicClient.estimateContractGas({
//   //   account,
//   //   address: GOERLI_PROXY_ADDRESS,
//   //   abi: proxyInterface.abi,
//   //   functionName: "deleteRegistry",
//   // });
//   // const gasPrice = await publicClient.getGasPrice();
//   // const request = await walletClient.writeContract({
//   //   account,
//   //   address: GOERLI_PROXY_ADDRESS,
//   //   abi: proxyInterface.abi,
//   //   functionName: "deleteRegistry",
//   //   gasPrice,
//   //   gas,
//   // });
//   // await walletClient.writeContract(request);
// }

// async function getRegistryAddress(): Promise<`0x${string}` | undefined> {
//   // const data = await publicClient.readContract({
//   //   address: GOERLI_PROXY_ADDRESS,
//   //   abi: proxyInterface.abi,
//   //   functionName: "getRegistryAddress",
//   //   account,
//   // });
//   // return data?.toString();
//   return "0x000";
// }

// export async function getPasswords(): Promise<Password[]> {
//   // const registryAddress = await getRegistryAddress();
//   // if (registryAddress === undefined)
//   //   throw new Error("Registry address is undefined");
//   // const data = await publicClient.readContract({
//   //   address: registryAddress,
//   //   abi: registryInterface.abi,
//   //   functionName: "getPasswords",
//   //   account,
//   // });
//   // console.log(data);

//   // return data as Password[];
//     return []
// }

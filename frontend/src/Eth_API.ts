import MetaMaskOnboarding from "@metamask/onboarding";
import { useEffect, useRef, useState } from "react";
import proxyInterface from "../../backend/build/contracts/Proxy.json";
import registryInterface from "../../backend/build/contracts/Registry.json";
import {
  createPublicClient,
  defineChain,
  http,
  createWalletClient,
  custom,
} from "viem";
import { mainnet, goerli } from "viem/chains";
import { Password } from "./testData";

const CURRENT_CHAIN = goerli;
const GOERLI_PROXY_ADDRESS = "0xfc3b6c03d393be153AB1693CD4F6e70b66D4beaa";
const publicClient = createPublicClient({
  //   batch: {
  //     multicall: {
  //       wait: 1000,
  //     },
  //   },
  chain: CURRENT_CHAIN,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: CURRENT_CHAIN,
  transport: custom(window.ethereum),
});

export const [account] = await walletClient.getAddresses();

export async function batchUpdate(
  adds: Password[],
  deletes: Password[],
  updates: Password[]
) {
  const registryAddress = await getRegistryAddress();
  const gas = await publicClient.estimateContractGas({
    account,
    address: registryAddress,
    abi: registryInterface.abi,
    functionName: "batchUpdate",
    args: [adds, deletes, updates],
  });
  const gasPrice = await publicClient.getGasPrice();
  const request = await walletClient.writeContract({
    account,
    address: registryAddress,
    abi: registryInterface.abi,
    functionName: "batchUpdate",
    gasPrice,
    gas,
    args: [adds, deletes, updates],
  });
  await walletClient.writeContract(request);
}

export async function createRegistry() {
  const gas = await publicClient.estimateContractGas({
    account,
    address: GOERLI_PROXY_ADDRESS,
    abi: proxyInterface.abi,
    functionName: "createRegistry",
  });
  const gasPrice = await publicClient.getGasPrice();
  const request = await walletClient.writeContract({
    account,
    address: GOERLI_PROXY_ADDRESS,
    abi: proxyInterface.abi,
    functionName: "createRegistry",
    gasPrice,
    gas,
  });
  await walletClient.writeContract(request);
}

export async function deleteRegistry() {
  const gas = await publicClient.estimateContractGas({
    account,
    address: GOERLI_PROXY_ADDRESS,
    abi: proxyInterface.abi,
    functionName: "deleteRegistry",
  });
  const gasPrice = await publicClient.getGasPrice();
  const request = await walletClient.writeContract({
    account,
    address: GOERLI_PROXY_ADDRESS,
    abi: proxyInterface.abi,
    functionName: "deleteRegistry",
    gasPrice,
    gas,
  });
  await walletClient.writeContract(request);
}

async function getRegistryAddress(): Promise<`0x${string}` | undefined> {
  const data = await publicClient.readContract({
    address: GOERLI_PROXY_ADDRESS,
    abi: proxyInterface.abi,
    functionName: "getRegistryAddress",
    account,
  });
  return data?.toString();
}

export async function getPasswords(): Promise<Password[]> {
  const registryAddress = await getRegistryAddress();
  if (registryAddress === undefined)
    throw new Error("Registry address is undefined");
  const data = await publicClient.readContract({
    address: registryAddress,
    abi: registryInterface.abi,
    functionName: "getPasswords",
    account,
  });
  console.log(data);

  return data as Password[];
}

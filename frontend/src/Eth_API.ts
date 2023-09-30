

import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useRef, useState } from "react";
import proxyInterface from '../../backend/build/contracts/Proxy.json'
import registryInterface from '../../backend/build/contracts/Registry.json'
import { createPublicClient, defineChain, http, createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { Password } from './testData';

// type Password = {
//     id: number
//     nickname: string
//     password: string
//     username: string
//     domain: string
//     tag: number
// }

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
    batch: {
        multicall: {
            wait: 1000
        }
    },
    chain: localchain,
    transport: http()
})
const walletClient = createWalletClient({
    chain: localchain,
    transport: custom(window.ethereum)
})
export const [account] = await walletClient.getAddresses()

export async function batchUpdate(adds: Password[], deletes: Password[], updates: Password[]) {
    const registryAddress = await getRegistryAddress();
    const registryContract = {
        address: registryAddress,
        abi: registryInterface.abi,
    }

    const results = await publicClient.multicall({
        contracts: [
            ...adds.map(p => {
                return {
                    ...registryContract,
                    functionName: 'addPassword',
                    args: [p.nickname, p.passwordText, p.username, p.domain, p.tag]
                }
            }),
            ...updates.map(p => {
                return {
                    ...registryContract,
                    functionName: 'updatePassword',
                    args: [p.id, p.nickname, p.password, p.username, p.domain, p.tag]
                }
            }),
            ...deletes.map(p => {
                return {
                    ...registryContract,
                    functionName: 'deletePassword',
                    args: [p.id]
                }
            })
        ]
    })
    console.log('results', results)
}


export async function createRegistry() {
    const request = await walletClient.writeContract({
        account,
        address: proxyAddr,
        abi: proxyInterface.abi,
        functionName: 'createRegistry',
        chain: localchain
    })
    await walletClient.writeContract(request);
}

export async function deleteRegistry() {
    const request = await walletClient.writeContract({
        account,
        address: proxyAddr,
        abi: proxyInterface.abi,
        functionName: 'deleteRegistry',
    })
    await walletClient.writeContract(request);
}

async function getRegistryAddress(): Promise<`0x${string}` | undefined> {
    const data = await publicClient.readContract({
        address: proxyAddr,
        abi: proxyInterface.abi,
        functionName: 'getRegistryAddress',
        account
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
        args: [p.nickname, p.password, p.username, p.domain, p.tag]
    })
    console.log(request);
    await walletClient.writeContract(request);
}

async function deletePassword(id: number) {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const request = await walletClient.writeContract({
        account,
        address: registryAddress,
        abi: registryInterface.abi,
        functionName: 'deletePassword',
        args: [id]
    })
    console.log(request);
    await walletClient.writeContract(request);
}

export async function getPasswords(): Promise<Password[]> {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const data = await publicClient.readContract({
        address: registryAddress,
        abi: registryInterface.abi,
        functionName: 'getPasswords',
        account,
    })
    return data as Password[]
}

async function updatePassword(p: Password) {
    const registryAddress = await getRegistryAddress();
    if (registryAddress === undefined) throw new Error("Registry address is undefined")
    const data = await walletClient.writeContract({
        address: registryAddress,
        abi: registryInterface.abi,
        functionName: 'updatePassword',
        account,
        args: [p.id, p.nickname, p.password, p.username, p.domain, p.tag]
    })
    console.log(data)
}
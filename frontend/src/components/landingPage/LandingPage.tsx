import { useContext, useEffect, useRef, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
// import { createRegistry, getPasswords, deleteRegistry } from "../../Eth_API";
import { PasswordListContext } from "../../context/PasswordListContext";
import { EthContext } from "../../context/EthContext";
const LandingPage = () => {
  const hasMetaMask = useRef(false);
  const onboarding = new MetaMaskOnboarding();
  const { hasRegistry, setHasRegistry } = useContext(PasswordListContext);
  const { createRegistry, getPasswords } = useContext(EthContext)

  const [startPolling, setStartPolling] = useState(false);
  async function onClickConnect() {
    try {
      if (hasMetaMask.current === false) {
        // if false then chrome tab will open for you to download
        onboarding.startOnboarding();
      } else {
        // connects user wallet
        await window.ethereum?.request({ method: "eth_requestAccounts" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function isMetaMaskInstalled() {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask); // returns false if metamask is not installed; else true
  }

  useEffect(() => {
    hasMetaMask.current = isMetaMaskInstalled();
    console.log(hasMetaMask.current, "cur");
  }, []);

  useEffect(() => {
    const pollingInterval = 5000;

    // Start polling when the component mounts
    const poll = setInterval(async () => {
      getPasswords();
      try {
        await getPasswords();
        setStartPolling(false);
        setHasRegistry(true);
      } catch (e) {
        console.log(e);
      }
    }, pollingInterval);

    if (!startPolling) {
      clearInterval(poll);
    }

    // Stop polling when the component unmounts
    return () => clearInterval(poll);
  }, [startPolling, setHasRegistry]);

  console.log(window.ethereum);
  // check if metamask account
  // if not, show a message to install metamask
  return (
    <div className="flex flex-col items-center gap-4 m-4">
      <h1 className="text-4xl">Welcome to EtherPass</h1>
      <p className="prose text-center">
        Create a registry for safer password keeping
      </p>
      {/* <p>installed: {() => isMetaMaskInstalled()}</p> */}
      {!hasMetaMask && (
        <button className="btn" onClick={() => onClickConnect()}>
          Connect to MetaMask
        </button>
      )}
      {!hasRegistry && (
        <button
          className="btn"
          onClick={() => {
            createRegistry();
            setStartPolling(true);
          }}>
          Create Registry
        </button>
      )}
      {/* 
      <button className="btn" onClick={deleteRegistry}>
        Delete Registry
      </button> */}
    </div>
  );
};

export default LandingPage;

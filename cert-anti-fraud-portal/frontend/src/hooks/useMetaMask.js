import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useMetaMask() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { ethereum } = window;

    if (!ethereum) {
      setIsAvailable(false);
      return;
    }

    setIsAvailable(true);

    // Load existing connection if user already approved
    ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts && accounts.length > 0) {
          setAccount(ethers.getAddress(accounts[0]));
        }
      })
      .catch(() => {});

    ethereum
      .request({ method: "eth_chainId" })
      .then((id) => {
        setChainId(id);
      })
      .catch(() => {});

    const handleAccountsChanged = (accounts) => {
      if (!accounts || accounts.length === 0) {
        setAccount("");
      } else {
        setAccount(ethers.getAddress(accounts[0]));
      }
    };

    const handleChainChanged = (id) => {
      setChainId(id);
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (!ethereum.removeListener) return;
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const connect = async () => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    if (accounts && accounts.length > 0) {
      setAccount(ethers.getAddress(accounts[0]));
    }
    const id = await window.ethereum.request({ method: "eth_chainId" });
    setChainId(id);
  };

  const disconnect = () => {
    setAccount("");
  };

  const shortAccount =
    account && account.length > 10
      ? `${account.slice(0, 6)}…${account.slice(-4)}`
      : account;

  return {
    isAvailable,
    account,
    shortAccount,
    chainId,
    connect,
    disconnect
  };
}

"use client";

import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleWalletConnect = useCallback((address: string) => {
    setTonWalletAddress(address);

    console.log("Success wallet connect", address);
    setIsLoading(false);
  }, []);

  const handleWalletDisconnect = useCallback(() => {
    setTonWalletAddress(null);

    console.log("Success wallet disconnect");
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnect(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnect();
      }
    };

    checkWalletConnection();

    const unsubcribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnect(wallet.account.address);
      } else {
        handleWalletDisconnect();
      }
    });

    return () => {
      unsubcribe();
    };
  }, [tonConnectUI, handleWalletConnect, handleWalletDisconnect]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();

    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1>Connect Wallet Test</h1>

      {tonWalletAddress && (
        <div className="p-4">
          <p>Wallet address: {formatAddress(tonWalletAddress)}</p>
        </div>
      )}

      <button className="p-4 border rounded" onClick={handleWalletAction}>
        {tonConnectUI.connected ? "Disconnect" : "Connect"}
      </button>
    </main>
  );
}

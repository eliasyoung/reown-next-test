"use client";
import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitAccount,
} from "@reown/appkit/react";
import { networks } from "@/config";
import { useConnect, useBalance, injected } from "wagmi";
import type { Address } from "viem";

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { switchNetwork } = useAppKitNetwork();
  const { address, isConnected } = useAppKitAccount();
  const { connectAsync } = useConnect();
  const { refetch } = useBalance({
    address: address as Address,
  });

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const handleGetBalance = async () => {
    try {
      if (!isConnected) {
        await connectAsync({ connector: injected() });
      }
      const balance = await refetch();
      // sendBalance(
      //   balance?.data?.value.toString() + " " + balance?.data?.symbol.toString(),
      // );
      console.log(balance);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => open()}>Open</button>
      <button onClick={handleDisconnect}>Disconnect</button>
      <button onClick={() => switchNetwork(networks[1])}>Switch</button>
      <button onClick={handleGetBalance}>Get Balance</button>
    </div>
  );
};

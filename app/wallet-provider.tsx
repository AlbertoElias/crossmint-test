"use client";

import { useState, createContext, useEffect } from "react";
import { Blockchain, CrossmintAASDK, EVMAAWallet, ViemAccount } from "@crossmint/client-sdk-aa";
import { english, generateMnemonic, mnemonicToAccount } from "viem/accounts";

interface WalletContextType {
  wallet: EVMAAWallet | undefined;
  loading: boolean;
  createAAWallet: () => void;
  address: string;
  setAddress: (address: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

export const WalletContext = createContext<WalletContextType>({
  wallet: undefined,
  loading: false,
  createAAWallet: () => {},
  address: "",
  setAddress: () => {},
  email: "",
  setEmail: () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<EVMAAWallet | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "";
    setEmail(storedEmail);
  }, []);

  const createAAWallet = async () => {
    setLoading(true);
    const wallet = await createAAWalletHelper();
    setWallet(wallet);
    setLoading(false);
  };

  const createAAWalletHelper = async () => {
    if (typeof window !== "undefined") {
      const xm = CrossmintAASDK.init({
        apiKey: process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_API_KEY || "",
      });

      let mnemonic = localStorage.getItem(`mnemonic-${email}`) || "";
      if (!mnemonic) {
        mnemonic = generateMnemonic(english);
        localStorage.setItem(`mnemonic-${email}`, mnemonic);
      }

      const account = mnemonicToAccount(mnemonic) as any;
      // NOTE: Do NOT do this in production. This is just for demo purposes.
      // Proper storage of private key material is critical.
      // Crossmint supports several secure signer options, documented later in the guide.

      const signer: ViemAccount = {
        type: "VIEM_ACCOUNT",
        account,
      };

      const wallet = await xm.getOrCreateWallet({ email }, Blockchain.POLYGON_AMOY, { signer });

      const walletAddress = await wallet.getAddress();
      console.log(walletAddress);
      setAddress(walletAddress);

      return wallet;
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, loading, createAAWallet, address, setAddress, email, setEmail }}>
      {children}
    </WalletContext.Provider>
  );
}
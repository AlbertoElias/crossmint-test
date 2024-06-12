"use client";

import { useContext } from "react";
import { WalletContext } from "../wallet-provider";
import Spinner from "./spinner";

export default function Wallet() {
  const { loading, createAAWallet, email, setEmail } = useContext(WalletContext);

  const saveEmail = (email: string) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };

  return (
    <div className="">
      {loading ? <Spinner /> : (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => saveEmail(e.target.value)}
            placeholder="Enter your email"
            className="border rounded w-72 p-2 my-2 text-black"
          />
          <button
            onClick={createAAWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-3 py-2 px-4 rounded focus:outline-none"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

type Wallet = {
  id: number;
  address: string;
  balance: number;
  activity?: "active";
};

const fallbackWallets: Wallet[] = [
  {
    id: 1,
    address: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    balance: 0,
  },
  {
    id: 2,
    address: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    balance: 0,
  },
];

export default function SystemWallets() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [newWalletAddress, setNewWalletAddress] = useState<string>("");

  useEffect(() => {
    const fetchWallets = async () => {
      const { data: savedWallets, error } = await supabase.from("system_wallets").select("*");

      if (error) {
        console.error("❌ Error fetching wallets:", error);
      } else {
        console.log("✅ Saved wallets from Supabase:", savedWallets);

        if (savedWallets && savedWallets.length > 0) {
          const wallets = savedWallets.map((wallet, index) => ({
            id: wallet.id ?? index + 1,
            address: wallet.address,
            balance: 0, // Default 0 balance for now
            activity: undefined,
          }));

          setWallets(wallets);
        } else {
          setWallets(fallbackWallets);
        }
      }
    };

    fetchWallets();
  }, []);

  const handleAddWallet = async () => {
    if (newWalletAddress.trim() === "") return;

    const { data, error } = await supabase.from("system_wallets").insert([
      { address: newWalletAddress },
    ]);

    if (error) {
      console.error("❌ Error adding wallet:", error);
    } else {
      console.log("✅ Wallet added:", data);
      setNewWalletAddress(""); // Clear input
      // Refetch wallets
      const { data: savedWallets } = await supabase.from("system_wallets").select("*");
      if (savedWallets && savedWallets.length > 0) {
        const wallets = savedWallets.map((wallet, index) => ({
          id: wallet.id ?? index + 1,
          address: wallet.address,
          balance: 0,
          activity: undefined,
        }));
        setWallets(wallets);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">System Wallets</h1>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter wallet address"
          value={newWalletAddress}
          onChange={(e) => setNewWalletAddress(e.target.value)}
        />
        <Button onClick={handleAddWallet}>Add Wallet</Button>
      </div>
      <div className="flex flex-col gap-2">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="border rounded-lg p-4 flex flex-col gap-1"
          >
            <p><strong>Address:</strong> {wallet.address}</p>
            {/* Optionally display last used if you want */}
          </div>
        ))}
      </div>
    </div>
  );
}

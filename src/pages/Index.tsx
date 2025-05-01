import { useEffect, useState, FC } from "react";
import { supabase } from '@/lib/supabase';

interface Wallet {
  id: string;
  address: string;
  last_used: string;
}

interface IndexProps {
  nonce?: string;
}

const Index: FC<IndexProps> = ({ nonce }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    // Function to fetch wallets initially
    const fetchWallets = async () => {
      const { data, error } = await supabase
        .from("system_wallets")
        .select("*")
        .order("last_used", { ascending: false });

      if (error) {
        console.error("❌ Supabase error:", error.message);
        setError(error.message);
      } else {
        setWallets(data || []);
      }
    };

    // Fetch the wallets when component mounts
    fetchWallets();

    // Realtime updates with error handling
    const channel = supabase
      .channel("wallets-changes")
      .on(
        "postgres_changes",
        { 
          event: "INSERT", 
          schema: "public", 
          table: "system_wallets" 
        },
        (payload) => {
          console.log("Received real-time update:", payload);
          setWallets((prev) => [payload.new as Wallet, ...prev]);
        }
      )
      .subscribe((status, err) => {
        if (status === 'CHANNEL_ERROR') {
          console.error("Realtime error:", err);
          setError("Realtime connection failed");
        }
      });

    // Cleanup the subscription when the component is unmounted
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;

    const { error } = await supabase
      .from("system_wallets")
      .insert([{ address: newAddress }]);

    if (error) {
      console.error("Insert error:", error.message);
      setError(error.message);
    } else {
      setNewAddress("");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto" nonce={nonce}>
      <h1 className="text-2xl font-bold mb-4">System Wallets</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="border p-2 rounded w-full mb-2"
          nonce={nonce}
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          nonce={nonce}
        >
          Add Wallet
        </button>
      </form>

      {error && (
        <p className="text-red-500" nonce={nonce}>
          Error: {error}
        </p>
      )}

      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id} className="mb-2 border-b pb-2">
            <strong>Address:</strong> {wallet.address} <br />
            <strong>Last Used:</strong> {new Date(wallet.last_used).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;

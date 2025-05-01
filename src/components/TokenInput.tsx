
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenData {
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

interface TokenInputProps {
  onTokenSelect: (token: TokenData) => void;
}

const TokenInput = ({ onTokenSelect }: TokenInputProps) => {
  const [mintAddress, setMintAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock function to simulate fetching token data
  const fetchTokenData = async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For demo purposes, generate mock data based on address input
      // In a real app, this would be an actual API call to fetch Solana token data
      const mockTokens: Record<string, TokenData> = {
        "defaulttoken": {
          name: "Solana Demo Token",
          symbol: "DEMO",
          decimals: 9,
          logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png"
        },
        "solusdt": {
          name: "USDT (Solana)",
          symbol: "USDT",
          decimals: 6,
          logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png"
        },
        "solraytoken": {
          name: "Raydium Token",
          symbol: "RAY",
          decimals: 6,
          logoURI: "https://cryptologos.cc/logos/raydium-ray-logo.png"
        }
      };

      // Check for some known addresses to show demo data
      let tokenData: TokenData;
      const normalizedAddress = address.toLowerCase().replace(/\s/g, '');
      
      if (normalizedAddress in mockTokens) {
        tokenData = mockTokens[normalizedAddress];
      } else if (address.length >= 32) {
        // If it looks like a real address, generate a random token
        tokenData = {
          name: `Token ${address.substring(0, 4)}...${address.substring(address.length - 4)}`,
          symbol: address.substring(0, 4).toUpperCase(),
          decimals: Math.floor(Math.random() * 10),
          logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png"
        };
      } else {
        throw new Error("Invalid token address");
      }

      onTokenSelect(tokenData);
    } catch (err) {
      setError("Failed to fetch token data. Please check the address and try again.");
      console.error("Token fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 w-full max-w-md mx-auto">
      <h2 className="text-solana-purple font-semibold text-xl mb-4 text-glow">Enter Token Address</h2>
      
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter Solana token mint address"
          className="bg-solana-darker border-solana-purple/50 text-white pr-12 terminal-text"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1 h-8 w-8 text-solana-cyan hover:text-solana-cyan-light button-glow"
          onClick={() => fetchTokenData(mintAddress)}
          disabled={loading || !mintAddress}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <Search size={16} />
          )}
        </Button>
      </div>

      {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
      
      {loading && (
        <div className="mt-4 animate-pulse space-y-2">
          <Skeleton className="h-5 w-3/4 bg-solana-dark" />
          <Skeleton className="h-5 w-1/2 bg-solana-dark" />
        </div>
      )}
    </div>
  );
};

export default TokenInput;

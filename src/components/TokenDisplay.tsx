
import { Card } from "@/components/ui/card";

interface TokenData {
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

interface TokenDisplayProps {
  token: TokenData | null;
}

const TokenDisplay = ({ token }: TokenDisplayProps) => {
  if (!token) return null;

  return (
    <Card className="glass-panel p-6 w-full max-w-md mx-auto my-4 overflow-hidden">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-solana-darker flex items-center justify-center border border-solana-purple/30 neon-glow">
          {token.logoURI ? (
            <img
              src={token.logoURI}
              alt={token.name}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <div className="text-xl font-bold text-solana-purple">
              {token.symbol.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white">{token.name}</h3>
          <div className="flex items-center mt-1 space-x-2 text-sm">
            <span className="text-solana-purple-light font-semibold">
              {token.symbol}
            </span>
            <span className="text-solana-gray">/</span>
            <span className="text-solana-gray">
              Decimals: {token.decimals}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-solana-purple/20">
        <div className="flex justify-between items-center text-sm">
          <span className="text-solana-gray">Token Address:</span>
          <span className="terminal-text bg-solana-darker px-2 py-1 rounded text-solana-cyan-light">
            {token.name.includes('Token') ? token.name.split(' ')[1] : '...'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TokenDisplay;

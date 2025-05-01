
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

interface BoostConfig {
  solAmount: number;
  loopCount: number;
  delaySeconds: number;
}

interface ConfigPanelProps {
  onStartBoost: (config: BoostConfig) => void;
  walletConnected: boolean;
}

const ConfigPanel = ({ onStartBoost, walletConnected }: ConfigPanelProps) => {
  const [solAmount, setSolAmount] = useState<number>(0.1);
  const [loopCount, setLoopCount] = useState<number>(5);
  const [delaySeconds, setDelaySeconds] = useState<number>(2);

  const handleStartBoost = () => {
    onStartBoost({
      solAmount,
      loopCount,
      delaySeconds
    });
  };

  return (
    <Card className="glass-panel p-6 w-full max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold mb-6 text-solana-purple text-glow">
        Configure Boost Parameters
      </h2>

      {/* SOL Amount */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-solana-cyan-light text-sm font-medium">
            SOL Per Trade
          </label>
          <span className="terminal-text bg-solana-darker px-2 py-1 rounded text-sm">
            {solAmount} SOL
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Slider
            value={[solAmount]}
            min={0.01}
            max={2}
            step={0.01}
            onValueChange={(values) => setSolAmount(values[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={solAmount}
            onChange={(e) => setSolAmount(Number(e.target.value))}
            min={0.01}
            max={2}
            step={0.01}
            className="w-20 bg-solana-darker border-solana-purple/50 text-white terminal-text"
          />
        </div>
      </div>

      {/* Loop Count */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-solana-cyan-light text-sm font-medium">
            Buy/Sell Loops
          </label>
          <span className="terminal-text bg-solana-darker px-2 py-1 rounded text-sm">
            {loopCount} loops
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Slider
            value={[loopCount]}
            min={1}
            max={20}
            step={1}
            onValueChange={(values) => setLoopCount(values[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={loopCount}
            onChange={(e) => setLoopCount(Number(e.target.value))}
            min={1}
            max={20}
            step={1}
            className="w-20 bg-solana-darker border-solana-purple/50 text-white terminal-text"
          />
        </div>
      </div>

      {/* Delay Between Trades */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-solana-cyan-light text-sm font-medium">
            Delay Between Trades
          </label>
          <span className="terminal-text bg-solana-darker px-2 py-1 rounded text-sm">
            {delaySeconds} sec
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Slider
            value={[delaySeconds]}
            min={1}
            max={10}
            step={1}
            onValueChange={(values) => setDelaySeconds(values[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={delaySeconds}
            onChange={(e) => setDelaySeconds(Number(e.target.value))}
            min={1}
            max={10}
            step={1}
            className="w-20 bg-solana-darker border-solana-purple/50 text-white terminal-text"
          />
        </div>
      </div>

      {/* Start Boost Button */}
      <Button
        onClick={handleStartBoost}
        disabled={!walletConnected}
        className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-solana-purple to-solana-cyan border border-solana-purple-light/50 neon-glow hover:brightness-110 transition-all duration-300 animate-bounce-subtle"
      >
        <Rocket className="mr-2" size={20} />
        🚀 Start Boost
      </Button>

      {!walletConnected && (
        <p className="text-solana-gray text-sm mt-2 text-center">
          Connect wallet to start boosting
        </p>
      )}
    </Card>
  );
};

export default ConfigPanel;

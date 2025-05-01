import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { createJupiterSwap } from '@/lib/swap';

interface BoostFormProps {
  defaultAmount?: number;
  defaultLoops?: number;
}

export const BoostForm = ({
  defaultAmount = 0.1,
  defaultLoops = 5
}: BoostFormProps) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState(defaultAmount);
  const [loops, setLoops] = useState(defaultLoops);
  const [isBoosting, setIsBoosting] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const { toast } = useToast();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const validateTokenAddress = (address: string): boolean => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  const handleBoost = async () => {
    if (!publicKey) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive'
      });
      return;
    }

    if (!tokenAddress || !validateTokenAddress(tokenAddress)) {
      toast({
        title: 'Invalid Token Address',
        description: 'Please enter a valid Solana token address',
        variant: 'destructive'
      });
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a positive SOL amount',
        variant: 'destructive'
      });
      return;
    }

    if (loops <= 0 || isNaN(loops)) {
      toast({
        title: 'Invalid Cycles',
        description: 'Please enter at least 1 cycle',
        variant: 'destructive'
      });
      return;
    }

    setIsBoosting(true);
    setCurrentCycle(0);

    try {
      const solMint = new PublicKey('So11111111111111111111111111111111111111112'); // SOL mint address
      const tokenMint = new PublicKey(tokenAddress); // SPL token mint address

      for (let i = 0; i < loops; i++) {
        setCurrentCycle(i + 1);

        toast({
          title: `Starting Cycle ${i + 1}/${loops}`,
          description: `Preparing to trade ${amount} SOL`
        });

        // Buy Transaction (SOL → Token)
        const buyTx = await createJupiterSwap(
          connection,
          {
            inputMint: solMint,
            outputMint: tokenMint,
            amount: amount * 1e9, // Convert SOL to lamports
            slippageBps: 100, // 1% slippage
            user: publicKey
          }
        );

        const buySig = await sendTransaction(buyTx, connection);
        await connection.confirmTransaction(buySig);

        // Sell Transaction (Token → SOL)
        const sellTx = await createJupiterSwap(
          connection,
          {
            inputMint: tokenMint,
            outputMint: solMint,
            amount: amount * 0.99 * 1e9, // Account for 1% slippage
            slippageBps: 100,
            user: publicKey
          }
        );

        const sellSig = await sendTransaction(sellTx, connection);
        await connection.confirmTransaction(sellSig);

        toast({
          title: `Cycle ${i + 1}/${loops} Complete`,
          description: `Successfully traded ${amount} SOL`
        });

        // Add delay between cycles to avoid rate limiting
        if (i < loops - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      toast({
        title: 'Boost Completed!',
        description: `Finished ${loops} trade cycles`,
        duration: 5000
      });

    } catch (error) {
      console.error('Boost failed:', error);
      toast({
        title: 'Boost Failed',
        description: error instanceof Error ? error.message : 'Transaction error',
        variant: 'destructive'
      });
    } finally {
      setIsBoosting(false);
      setCurrentCycle(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-xl border">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Token Volume Booster
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Token Mint Address
          </label>
          <Input
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value.trim())}
            placeholder="e.g. 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
            className="font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              SOL Amount per Trade
            </label>
            <Input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Cycles
            </label>
            <Input
              type="number"
              min="1"
              max="20"
              value={loops}
              onChange={(e) => setLoops(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        <Button
          onClick={handleBoost}
          disabled={isBoosting || !publicKey}
          className="w-full py-6 text-lg font-semibold mt-4"
          variant="gradient"
        >
          {isBoosting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⟳</span>
              Boosting ({currentCycle}/{loops})
            </span>
          ) : (
            `Boost Volume (${(amount * loops).toFixed(2)} SOL Total)`
          )}
        </Button>

        {!publicKey && (
          <p className="text-sm text-center text-muted-foreground">
            Connect your wallet to start boosting
          </p>
        )}
      </div>
    </div>
  );
};

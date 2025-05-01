import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Split } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Connection, 
  PublicKey, 
  SystemProgram, 
  Transaction, 
  LAMPORTS_PER_SOL,
  Keypair
} from "@solana/web3.js";
import type { AppCluster, ActionPanelProps } from "./Dashboard";

const DistributePanel = ({ 
  publicKey, 
  signTransaction,
  connection,
  network
}: ActionPanelProps) => {
  const [amount, setAmount] = useState<number>(0.5);
  const [walletCount, setWalletCount] = useState<number>(10);
  const [isDistributing, setIsDistributing] = useState(false);
  const { toast } = useToast();

  const handleDistribute = async () => {
    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    setIsDistributing(true);
    
    try {
      const amountPerWallet = (amount / walletCount) * LAMPORTS_PER_SOL;
      const totalAmount = amount * LAMPORTS_PER_SOL;

      const userBalance = await connection.getBalance(publicKey);
      if (userBalance < totalAmount) {
        toast({
          title: "Insufficient Balance",
          description: `You need ${amount} SOL but only have ${userBalance/LAMPORTS_PER_SOL} SOL`,
          variant: "destructive"
        });
        return;
      }

      const transaction = new Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const receivingWallets = Array.from({ length: walletCount }, () => Keypair.generate());
      receivingWallets.forEach(wallet => {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: wallet.publicKey,
            lamports: Math.floor(amountPerWallet)
          })
        );
      });

      const signedTx = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      toast({
        title: "✅ Distribution Successful",
        description: `${amount} SOL distributed to ${walletCount} wallets\nNetwork: ${network}\nTx: ${signature.slice(0, 10)}...`,
      });
    } catch (error: any) {
      console.error("Distribution failed:", error);
      toast({
        title: "❌ Distribution Failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDistributing(false);
    }
  };

  return (
    <Card className="glass-panel p-6 w-full max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4 text-solana-purple">
        Distribute Funds
      </h2>
      
      <div className="space-y-4">
        {/* ... rest of your JSX ... */}
      </div>
    </Card>
  );
};

export default DistributePanel;
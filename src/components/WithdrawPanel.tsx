import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react"; // Added missing import
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

const WithdrawPanel = ({ 
  publicKey, 
  signTransaction,
  connection,
  network
}: ActionPanelProps) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const { toast } = useToast();

  const handleWithdraw = async () => {
    if (!publicKey || !signTransaction) return;

    setIsWithdrawing(true);
    try {
      const systemWallets = Array.from({ length: 10 }, () => Keypair.generate());
      let totalWithdrawn = 0;

      for (const wallet of systemWallets) {
        const balance = await connection.getBalance(wallet.publicKey);
        
        if (balance > 0.01 * LAMPORTS_PER_SOL) {
          const withdrawAmount = balance - 0.01 * LAMPORTS_PER_SOL;

          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: publicKey,
              lamports: withdrawAmount
            })
          );

          const { blockhash } = await connection.getLatestBlockhash();
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = wallet.publicKey;

          transaction.sign(wallet);
          const signature = await connection.sendRawTransaction(transaction.serialize());
          await connection.confirmTransaction(signature);
          
          totalWithdrawn += withdrawAmount / LAMPORTS_PER_SOL;
        }
      }

      if (totalWithdrawn > 0) {
        toast({
          title: "Withdrawal Successful",
          description: `Withdrawn ${totalWithdrawn.toFixed(4)} SOL to your main wallet\nNetwork: ${network}`,
        });
      } else {
        toast({
          title: "No funds to withdraw",
          description: "System wallets have insufficient balance",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      toast({
        title: "Withdrawal Failed",
        description: error instanceof Error ? error.message : "Failed to withdraw funds",
        variant: "destructive"
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Card className="glass-panel p-6 w-full max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4 text-solana-purple">
        Withdraw Funds
      </h2>
      
      <Button
        onClick={handleWithdraw}
        disabled={!publicKey || isWithdrawing}
        className="w-full bg-solana-purple hover:bg-solana-purple-light text-white button-glow"
      >
        <Wallet className="mr-2" />
        {isWithdrawing ? "Withdrawing..." : "Withdraw All Funds to Main Wallet"}
      </Button>
    </Card>
  );
};

export default WithdrawPanel;
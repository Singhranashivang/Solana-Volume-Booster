import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Connection, Transaction } from "@solana/web3.js";
import WalletPanel from "./WalletPanel";
import DistributePanel from "./DistributePanel";
import WithdrawPanel from "./WithdrawPanel";

export type AppCluster = "mainnet-beta" | "devnet" | "testnet";

export interface ActionPanelProps {
  publicKey: PublicKey;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connection: Connection;
  network: AppCluster;
}

const Dashboard = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, connected } = useWallet();
  
  const [network, setNetwork] = useState<AppCluster>("mainnet-beta");

  const handleNetworkChange = (net: AppCluster) => {
    console.log(`Network changing to: ${net}`);
    setNetwork(net);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-solana-darkest via-solana-dark to-solana-darkest">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WalletPanel 
              isConnected={connected}
              publicKey={publicKey}
              network={network}
              onNetworkChange={handleNetworkChange}
            />
            
            {connected && publicKey && signTransaction && (
              <>
                <DistributePanel 
                  publicKey={publicKey}
                  signTransaction={signTransaction}
                  connection={connection}
                  network={network}
                />
                <WithdrawPanel 
                  publicKey={publicKey}
                  signTransaction={signTransaction}
                  connection={connection}
                  network={network}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
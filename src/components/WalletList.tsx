import React, { useEffect, useState } from 'react';

interface Wallet {
  address: string;
  lastUsed: string;
}

const WalletList = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    // Fetch wallet data, simulate this with sample data or integrate with Solana backend.
    const fetchWallets = async () => {
      const fetchedWallets = [
        {
          address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          lastUsed: '23/04/2025, 19:11:26',
        },
        {
          address: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
          lastUsed: '23/04/2025, 19:11:26',
        },
        // Add more wallets or fetch from backend
      ];
      setWallets(fetchedWallets);
    };

    fetchWallets();
  }, []);

  return (
    <div>
      <h2>System Wallets</h2>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Last Used</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet, index) => (
            <tr key={index}>
              <td>{wallet.address}</td>
              <td>{wallet.lastUsed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletList;

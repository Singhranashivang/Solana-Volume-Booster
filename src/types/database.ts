
export interface TransactionHistory {
  id: string;
  wallet_address: string;
  amount: number;
  timestamp: string;
  transaction_type: 'distribute' | 'boost';
  status: 'success' | 'failed';
}

export interface SystemWalletConfig {
  id: string;
  address: string;
  is_active: boolean;
  last_updated: string;
}

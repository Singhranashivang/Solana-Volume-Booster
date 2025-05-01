
import { useState } from 'react';
import { supabase, hasValidSupabaseCredentials } from '@/lib/supabase';
import type { TransactionHistory } from '@/types/database';

export const useTransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveTransaction = async (
    walletAddress: string,
    amount: number,
    type: 'distribute' | 'boost'
  ) => {
    setIsLoading(true);
    try {
      // Only attempt to save to Supabase if we have valid credentials
      if (hasValidSupabaseCredentials()) {
        const { error } = await supabase
          .from('transaction_history')
          .insert({
            wallet_address: walletAddress,
            amount,
            transaction_type: type,
            status: 'success',
            timestamp: new Date().toISOString()
          });

        if (error) throw error;
      } else {
        console.warn("No valid Supabase credentials. Transaction not saved to database.");
        // Just log the transaction locally
        console.info("Transaction:", { 
          wallet_address: walletAddress, 
          amount, 
          transaction_type: type,
          status: 'success',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveTransaction,
    isLoading
  };
};

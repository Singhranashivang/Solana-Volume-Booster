// src/lib/wallets.ts
import { supabase } from '@/lib/supabase';


// Define the shape of the Supabase response
type SupabaseWalletRaw = {
  id: string;
  address: string;
  is_active: boolean;
  last_used: string;
  created_at?: string;
};

// Final Wallet shape (used in app)
export interface Wallet {
  id: string;
  address: string;
  isActive: boolean;
  lastUsed: string;
}

// Main fetch function
export async function fetchFromSupabase(): Promise<Wallet[]> {
  const { data, error } = await supabase
    .from('system_wallets')
    .select('*')
    .order('last_used', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  // If data is empty or not an array, return []
  if (!Array.isArray(data)) {
    console.warn('Unexpected Supabase data format');
    return [];
  }

  // Type assertion since Supabase doesn't infer types
  const rawWallets = data as SupabaseWalletRaw[];

  return rawWallets.map(item => ({
    id: item.id,
    address: item.address,
    isActive: item.is_active,
    lastUsed: item.last_used,
  }));
}

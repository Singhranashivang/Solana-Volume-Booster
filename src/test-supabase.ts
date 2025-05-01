import { supabase } from '@/lib/supabase';


async function testConnection() {
  const { data, error } = await supabase.from('system_wallets').select('*');

  if (error) {
    console.error('❌ Supabase error:', error.message);
  } else {
    console.log('✅ Supabase data:', data);
  }
}

testConnection();

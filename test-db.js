require('dotenv').config({ path: '.env.local' });
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class { constructor() {} addEventListener() {} removeEventListener() {} close() {} };
}
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  try {
    const { data, error, count } = await supabase
      .from('publications')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase Error:', error.message);
    } else {
      console.log('Connection successful!');
      console.log(`Found ${count} publications.`);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();

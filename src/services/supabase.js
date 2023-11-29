import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://agtfpuvvaahsmkfufwgh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndGZwdXZ2YWFoc21rZnVmd2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyODk1MzMsImV4cCI6MjAxNTg2NTUzM30.eRSM9Ij2ZEZos2VK3Ifvo_DGpo9nUBHVywbv18jejF4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

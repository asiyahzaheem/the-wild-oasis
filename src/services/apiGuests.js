import supabase from './supabase';

export async function getGuest() {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    throw new Error('Guest not found');
  }
  return data;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from('guests')
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

// add RLS

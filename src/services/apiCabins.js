import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  // if cabin being edited has an image, the image path is the one we created. however, if they edit the image, the image will be a fielist. we need to account for this

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from('cabins');

  // A) CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { error, data } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  if (hasImagePath) return data;
  // 2. upload image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. delete cabin if there is storage error
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded');
  }
  return data;
}

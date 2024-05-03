import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const sheetMusic = {
  async all() {
    const { data, error } = await supabase.from('sheet_music').select('*');
    if (error) throw error;
    return data;
  }
}
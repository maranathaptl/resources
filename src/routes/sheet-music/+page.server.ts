import { supabase } from '$lib/supabase';

export async function load() {
  const { data } = await supabase.from("sheet_music").select().order('piece', { ascending: true });
  return {
    sheets: data ?? [],
  };
}
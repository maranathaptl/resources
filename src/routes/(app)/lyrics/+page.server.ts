import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ url }) {
  const { data } = await supabase
    .from('lyrics')
    .select()
    .or(`title.ilike.%${url.searchParams.get('q') || ''}%, artist.ilike.%${url.searchParams.get('q') || ''}%`)
    .order('id', { ascending: false })
    .limit(27);

  return {
    files: data ?? [],
  };
}
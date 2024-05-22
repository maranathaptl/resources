import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ url }) {
  const { data } = await supabase
    .from('lyrics')
    .select()
    .like('title', `%${url.searchParams.get('q') || ''}%`)
    .order('title', { ascending: true })
    .limit(27);

  return {
    files: data ?? [],
  };
}
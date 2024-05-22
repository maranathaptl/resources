import { parseXml } from '$lib/xmlParser';
import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ params }) {
  const { data } = await supabase
    .from('lyrics')
    .select()
    .eq('id', (params.slug.split('-').findLast((el: string) => !isNaN(parseInt(el))) || ''))
    .maybeSingle();

  const lyrics = await parseXml(data.file);
  const header = [{
    title: data.title,
    artist: data.artist,
  }];

  return {
    header: header || [],
    lyrics: lyrics.results || [],
  }
}
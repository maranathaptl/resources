import { parseXml } from '$lib/xmlParser';
import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ params }) {
  const id = params.slug.replaceAll('/', '').split('-').findLast((el: string) => !isNaN(parseInt(el))) || '';
  console.log(id)

  const lyricsData = await supabase
    .from('lyrics')
    .select()
    .eq('id', id)
    .maybeSingle();

  const referencesData = await supabase
    .from('references')
    .select()
    .eq('lyrics_id', lyricsData.data.id);

  const lyrics = await parseXml(lyricsData.data.file);
  const header = [{
    title: lyricsData.data.title,
    artist: lyricsData.data.artist,
  }];

  return {
    header: header || [],
    lyrics: lyrics.results || [],
    references: referencesData.data || [],
  }
}
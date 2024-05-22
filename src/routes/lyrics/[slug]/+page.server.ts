import { parseXml } from '$lib/xmlParser';
import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ params }) {
  const lyricsData = await supabase
    .from('lyrics')
    .select()
    .eq('id', (params.slug.split('-').findLast((el: string) => !isNaN(parseInt(el))) || ''))
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
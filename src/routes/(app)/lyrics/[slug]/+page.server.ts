import { parseXml } from '$lib/xmlParser';
import { supabase } from '$lib/supabase';
import { getLyricsUrl, getSheetMusicUrl } from '$lib/helpers';

export const prerender = false;

export async function load({ params }) {
  const id = params.slug.replaceAll('/', '').split('-').findLast((el: string) => !isNaN(parseInt(el))) || '';

  const lyricsData = await supabase
    .from('lyrics')
    .select()
    .eq('id', id)
    .maybeSingle();

  const referencesData = await supabase
    .from('references')
    .select()
    .eq('lyrics_id', lyricsData.data.id);

  const linkedReferences = await supabase
    .from('resources_links')
    .select()
    .eq(`lyrics_id`, lyricsData.data.id)
    .maybeSingle();

  let finalLinkedReferences;

  if (!linkedReferences.data) {
    finalLinkedReferences = null;
  } else {
    finalLinkedReferences = {
      lyrics: await getLyricsUrl(linkedReferences.data ? linkedReferences.data.lyrics_id : undefined),
      sheet_music: await getSheetMusicUrl(linkedReferences.data ? linkedReferences.data.sheet_music_id : undefined)
    }
  }

  const lyrics = await parseXml(lyricsData.data.file);
  const header = [{
    title: lyricsData.data.title,
    artist: lyricsData.data.artist,
  }];

  return {
    header: header || [],
    lyrics: lyrics.results || [],
    references: referencesData.data || [],
    linkedReferences: finalLinkedReferences,
    lyricsId: lyricsData.data.id,
    lyricsFile: lyricsData.data.file
  }
}
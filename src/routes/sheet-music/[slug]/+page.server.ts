import { supabase } from '$lib/supabase';
import { getLyricsUrl, getSheetMusicUrl } from '$lib/helpers';

export async function load({ params }) {
  const sheetMusicData = await supabase.storage.from('sheet-music').list(params.slug, {
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  const sheetMusicDataFromDb = await supabase
    .from('sheet_music')
    .select()
    .eq('slug', params.slug)
    .maybeSingle();

  const referencesData = await supabase
    .from('references')
    .select()
    .eq('sheet_music_id', sheetMusicDataFromDb.data.id);

  const linkedReferences = await supabase
    .from('resources_links')
    .select()
    .eq(`sheet_music_id`, sheetMusicDataFromDb.data.id)
    .maybeSingle();

  console.log('linkedReferences', linkedReferences.data ?? {message: "no data"});

  let finalLinkedReferences;

  if (!linkedReferences.data) {
    finalLinkedReferences = null;
  } else {
    finalLinkedReferences = {
      lyrics: await getLyricsUrl(linkedReferences.data ? linkedReferences.data.lyrics_id : undefined),
      sheet_music: await getSheetMusicUrl(linkedReferences.data ? linkedReferences.data.sheet_music_id : undefined)
    }
  }

  const files = sheetMusicData.data?.map((file) => {
    return {
      name: file.name,
      url: supabase.storage.from('sheet-music').getPublicUrl(`${params.slug}/${file.name}`).data.publicUrl
    };
  });

  return {
    files: files ?? [],
    pieceName: params.slug,
    references: referencesData.data || [],
    linkedReferences: finalLinkedReferences,
    pieceId: sheetMusicDataFromDb.data.id
  };
}
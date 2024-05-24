import { supabase } from '$lib/supabase';

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

  console.log(referencesData.data);

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
    pieceId: sheetMusicDataFromDb.data.id
  };
}
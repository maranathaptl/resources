import { supabase } from '$lib/supabase';

export async function load({ params }) {
  const { data } = await supabase.storage.from('sheet-music').list(params.slug, {
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  const files = data?.map((file) => {
    return {
      name: file.name,
      url: supabase.storage.from('sheet-music').getPublicUrl(`${params.slug}/${file.name}`).data.publicUrl
    };
  });

  return {
    files: files ?? [],
    pieceName: params.slug
  };
}
import { supabase } from '$lib/supabase';

export async function load({ url }) {
  const { data } = await supabase.storage.from('lyrics').list('', {
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
    limit: 27,
    search: url.searchParams.get('q') || ''
  });

  const files = data?.filter((file) => file.name !== '.emptyFolderPlaceholder').map((file) => {
    return {
      name: file.name,
    };
  });

  return {
    files: files ?? [],
  };
}
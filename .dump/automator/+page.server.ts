import { supabase } from '../../src/lib/supabase';

export async function load() {
  const { data } = await supabase.storage.from('lyrics').list('', {
    offset: 0,
    limit: 2000,
    sortBy: { column: 'name', order: 'asc' },
  });

  const files = data?.filter((file) => file.name !== '.emptyFolderPlaceholder').map(async (file) => {
    const url = supabase.storage.from('lyrics').getPublicUrl(file.name);
    return {
      publicUrl: url.data.publicUrl
    };
  });

  return {
    files: files ?? [],
  };
}
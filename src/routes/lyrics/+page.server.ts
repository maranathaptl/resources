import { supabase } from '$lib/supabase';

export async function load() {
  const { data } = await supabase.storage.from('lyrics').list('', {
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
    limit: 100000
  });

  const files = data?.map((file) => {
    return {
      name: file.name,
    };
  });

  return {
    files: files ?? [],
  };
}
import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ url }) {
  const page = url.searchParams.get('p') ? url.searchParams.get('p') : 1;
  // @ts-ignore
  const offset = (page - 1) * 27 || 0;

  const urlQuery = url.searchParams.get('q') || '';
  const separator = '@';
  const separatorIndex = urlQuery?.indexOf(separator);

  // @ts-ignore
  const title = separatorIndex !== -1 ? urlQuery.substring(0, (separatorIndex - 1)) : urlQuery;
  // @ts-ignore
  const artist = separatorIndex !== -1 ? urlQuery.substring(separatorIndex + 2) : urlQuery;
  const query = `${title ? `title.ilike.%${title || ''}%` : ''}${ title && artist ? ',' : '' }${artist ? `artist.ilike.%${artist || ''}%` : ''}`;

  const { data } = urlQuery !== '' ? await supabase
    .from('lyrics')
    .select('*')
    .or(query)
    .order('id', { ascending: false })
    .range(offset, offset + 26) : await supabase
    .from('lyrics')
    .select('*')
    .order('id', { ascending: false })
    .range(offset, offset + 26);

  const { count } = urlQuery !== '' ? await supabase
    .from('lyrics')
    .select('*', { count: 'exact', head: true })
    .or(query) : await supabase
    .from('lyrics')
    .select('*', { count: 'exact', head: true });

  return {
    files: data ?? [],
    count: count ?? 0,
  };
}
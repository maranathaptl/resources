import { supabase } from '$lib/supabase';

export const prerender = false;

export async function load({ url }) {
  const page = url?.searchParams?.get('p') ? url.searchParams.get('p') : 1;
  // @ts-ignore
  const offset = (page - 1) * 27 || 0;

  const urlQuery = url.searchParams.get('q');
  const separator = '@';
  const separatorIndex = urlQuery?.indexOf(separator);

  // @ts-ignore
  const title = separatorIndex !== -1 ? urlQuery.substring(0, (separatorIndex - 1)) : urlQuery;
  // @ts-ignore
  const artist = separatorIndex !== - 1 ? urlQuery.substring(separatorIndex + 2) : '';
  const query = `${title ? `title.ilike.%${title || ''}%` : ''}${ title && artist ? ',' : '' }${artist ? `artist.ilike.%${artist || ''}%` : ''}` || '*';

  console.log(title);
  console.log(artist);

  console.log(query);

  const { data } = await supabase
    .from('lyrics')
    .select()
    .or(query)
    .order('id', { ascending: false })
    .range(offset, offset + 26)

  const { data: count } = await supabase
    .from('lyrics')
    .select()
    .or(query)
    .order('id', { ascending: false })

  return {
    files: data ?? [],
    count: count?.length ?? 0,
  };
}
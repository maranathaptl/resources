import { parseXml } from '$lib/xmlParser';
import { supabase } from '$lib/supabase';

export async function load({ params }) {
  const { data } = supabase.storage.from('lyrics').getPublicUrl(`${params.slug}.xml`);
  const lyrics = await parseXml(data.publicUrl);

  return {
    header: lyrics.header || [],
    lyrics: lyrics.results || []
  }
}
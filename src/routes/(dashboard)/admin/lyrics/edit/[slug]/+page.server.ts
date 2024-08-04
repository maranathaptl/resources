import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';

export const prerender = false;
let metaData = {};

export async function load({ params }) {
  const id = params.slug.replaceAll('/', '').split('-').findLast((el: string) => !isNaN(parseInt(el))) || '';

  const lyricsData = await supabase
    .from('lyrics')
    .select()
    .eq('id', id)
    .maybeSingle();

  const header = [{
    title: lyricsData.data.title,
    artist: lyricsData.data.artist,
  }];

  return {
    header: header || [],
    lyricsId: lyricsData.data.id,
    lyricsFile: lyricsData.data.file
  }
}

export const actions = {
  default: async ({ request }) => {
    const fromForm = await request.formData();

    const id = fromForm.get('id');
    const title = fromForm.get('title');
    const artist = fromForm.get('artist');
    const file = fromForm.get('file');

    if (!id) return fail(400, { id, idMissing: true });
    if (!title) return fail(400, { title, titleMissing: true });
    if (!artist) return fail(400, { artist, artistMissing: true });
    if (!file) return fail(400, { file, fileMissing: true });

    const { error } = await supabase
      .from('lyrics')
      .update({
        title: title,
        artist: artist,
      })
      .eq('id', id);

    if (error) {
      return fail(500, { error });
    }

    if (file) {
      const addToLyricsBucket = await supabase
        .storage
        .from('lyrics')
        .upload(`${title.toString().toUpperCase()} (${artist.toString().toUpperCase()}).xml`, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'text/xml',
        });

      const fromLyricsBucket = supabase
        .storage
        .from('lyrics')
        .getPublicUrl(<string>addToLyricsBucket.data?.path);

      const { error } = await supabase
        .from('lyrics')
        .update({
            file: fromLyricsBucket.data?.publicUrl,
        })
        .eq('id', id);

      if (error) {
        return fail(500, { error });
      }
    }
  }
}
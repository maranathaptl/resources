import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const fromForm = await request.formData();

    const title = fromForm.get('title');
    const artist = fromForm.get('artist');
    const category = fromForm.get('category');
    const file = fromForm.get('file');

    if (!title) return fail(400, { title, titleMissing: true });
    if (!artist) return fail(400, { artist, artistMissing: true });
    if (!category) return fail(400, { category, categoryMissing: true });
    if (!file) return fail(400, { file, fileMissing: true });

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

    try {
      await supabase
        .from('lyrics')
        .insert({
          title,
          artist,
          file: fromLyricsBucket.data?.publicUrl,
        });
    } catch (e) {
      console.log(e);
    }

    try {
      await supabase
        .from('songs')
        .insert({
          title,
          author: artist,
          category,
        });
    } catch (e) {
      console.log(e);
    }
  }
}
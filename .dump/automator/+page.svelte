<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { parseXml } from '$lib/xmlParser';

  export let data: any;

  function parseTitle(title: string): string {
    return title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

  onMount(async () => {
    data.files.forEach((item) => {
      item.then(async (res) => {
        const lyricData = await parseXml(res.publicUrl);
        const getLyricsFromDb = await supabase
          .from('lyrics')
          .select()
          .eq('title', parseTitle(lyricData.header[0].title))
          .eq('artist', parseTitle(lyricData.header[0].author));

        if (getLyricsFromDb.data?.length == 0) {
          const insertLyricsToDb = await supabase.from('lyrics').insert({
            title: parseTitle(lyricData.header[0].title),
            artist: parseTitle(lyricData.header[0].author),
            file: res.publicUrl
          });
          console.log(`DONE: ${parseTitle(lyricData.header[0].title)} - ${parseTitle(lyricData.header[0].author)}`);
        }
      });
    })
  });
</script>
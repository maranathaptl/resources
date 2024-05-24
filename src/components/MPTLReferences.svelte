<script lang="ts">
  import MPTLReferenceItem from '$components/MPTLReferenceItem.svelte';
  import { supabase } from '$lib/supabase';
  import { page } from '$app/stores';

  type Reference = {
    id: number;
    title: string;
    type: string;
    url: string;
    lyric_id?: number;
    sheet_music_id?: number;
    choreography_id?: number;
    chords_id?: number;
  }

  interface LinkedResourcesList {
    lyrics?: string,
    sheet_music?: string,
    choreography?: string,
    chords?: string
  }

  export let data: Reference[];
  export let id: number;
  export let db: string;

  async function getLyricsUrl(id: number) {
    const { data } = await supabase.from('lyrics').select().eq('id', id).maybeSingle();
    return `/lyrics/${ data.title.toLowerCase() }-${ id }`;
  }

  async function getSheetMusicUrl(id: number) {
    const { data } = await supabase.from('sheet_music').select().eq('id', id).maybeSingle();
    return `/sheet-music/${ data.slug }`;
  }

  async function getLinkedReferences(ref: number = id) {
    const linkedReferences = async () => {
      const { data } = await supabase.from('resources_links').select().eq(`${ db }_id`, ref).maybeSingle();
      return data;
    };
    const ids = await linkedReferences().then(res => res);
    const idDoesExist = (id: number) => id !== null || id !== undefined;

    if (!ids) {
      return {
        lyrics: undefined,
        sheet_music: undefined
      }
    }

    return {
      lyrics: await getLyricsUrl(ids.lyrics_id),
      sheet_music: await getSheetMusicUrl(ids.sheet_music_id)
    };
  }

  let linkedReferences: Promise<LinkedResourcesList> = getLinkedReferences().then(res => {
    return res;
  });
</script>

<section>
  <h2 class="title mt-xl">References</h2>
  {#if data.length > 0}
    <ul class="mptl-references">
      {#each data as reference}
        <MPTLReferenceItem url={reference.url}>{ reference.title }</MPTLReferenceItem>
      {/each}
    </ul>
  {:else }
    <p class="body">No references found</p>
  {/if}
  {#await linkedReferences}
    <ul class="mptl-references flex flow-column gap-xs mt-xs">
      <li style="width: 100px; height: 24px;" class="accent-blink r-sm"></li>
      <li style="width: 140px; height: 24px;" class="accent-blink r-sm"></li>
    </ul>
  {:then res}
    {#if res.valueOf() !== undefined}
      <ul class="mptl-references">
        {#if res.lyrics !== undefined && $page.url.pathname.split('/')[1] !== 'lyrics'}
          <MPTLReferenceItem type="linked" url={res.lyrics || ''}>Lyrics</MPTLReferenceItem>
        {/if}
        {#if res.sheet_music !== undefined && $page.url.pathname.split('/')[1] !== 'sheet-music'}
          <MPTLReferenceItem type="linked" url={res.sheet_music || ''}>Sheet Music</MPTLReferenceItem>
        {/if}
      </ul>
    {/if}
  {/await}
</section>
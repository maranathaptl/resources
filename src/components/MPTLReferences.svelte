<script lang="ts">
  import MPTLReferenceItem from '$components/MPTLReferenceItem.svelte';
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

  interface LinkedReferences {
    lyrics?: string,
    sheet_music?: string,
    choreography?: string,
    chords?: string
  }

  export let references: Reference[];
  export let linkedReferences: LinkedReferences|null;
  export let hasFile: boolean = false;
  export let file: string;
</script>

{#if references.length > 0 || linkedReferences}
  <section>
    <h2 class="title mt-xl">References</h2>
    <ul class="mptl-references">
      {#if references.length > 0}
        {#each references as reference}
          <MPTLReferenceItem url={reference.url}>{ reference.title }</MPTLReferenceItem>
        {/each}
      {/if}
      {#if linkedReferences}
        {#if linkedReferences.lyrics && $page.url.pathname.split('/')[1] !== 'lyrics'}
          <MPTLReferenceItem type="linked" url={linkedReferences.lyrics}>Lyrics</MPTLReferenceItem>
        {/if}
        {#if linkedReferences.sheet_music && $page.url.pathname.split('/')[1] !== 'sheet-music'}
          <MPTLReferenceItem type="linked" url={linkedReferences.sheet_music}>Sheet Music</MPTLReferenceItem>
        {/if}
      {/if}
      {#if hasFile}
        <MPTLReferenceItem type="file" url={file}>OpenLP File</MPTLReferenceItem>
      {/if}
    </ul>
  </section>
{:else}
  <section>
    <h2 class="title mt-xl">References</h2>
    <ul class="mptl-references">
      {#if hasFile}
        <MPTLReferenceItem type="file" url={file}>OpenLP File</MPTLReferenceItem>
      {/if}
    </ul>
  </section>
{/if}
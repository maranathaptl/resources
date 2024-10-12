<script lang="ts">
  import Lyrics from '$lib/images/lyrics.png.webp';
  import MPTLFormField from '$components/MPTLFormField.svelte';
  import MPTLButton from '$components/MPTLButton.svelte';
  import { goto } from '$app/navigation';

  export let data: any = [];
  export let form;

  function parseTitle(title: string): string {
    return title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

  function promptWithoutSaving(e: Event) {
    e.preventDefault();
    goto('/admin/lyrics');
  }

  $: isEditingFile = false;
</script>

<svelte:head>
  <title>{ parseTitle(data.header[0].title) } Lyrics - Maranatha Resources</title>
  <meta name="description" content="{ parseTitle(data.header[0].title) } Lyrics - Maranatha Resources"/>
  <meta property="og:image" content={Lyrics} />
  <meta name="twitter:image" content={Lyrics} />
</svelte:head>

<section class="mptl-pathbar">
  <nav aria-label="pathbar">
    <ul class="mptl-pathbar__wrapper">
      <li><a href="/admin">Home</a></li>
      <li><a href="/admin/lyrics">Lyrics</a></li>
      <li class="is-active">Edit { parseTitle(data.header[0].title) }</li>
    </ul>
  </nav>
</section>

<section>
  <form method="post" enctype="multipart/form-data" class="w-full flex flow-column wrap-none gap-md p-xl r-md fill-surface-300">
    <div class="none">
      <MPTLFormField label="ID" name="id" value={data.lyricsId} />
    </div>
    <MPTLFormField label="Title" name="title" value={ data.header[0].title} />
    <MPTLFormField label="Artist" name="artist" value={ data.header[0].artist } />
    <div class="flex gap-sm">
      {#if !isEditingFile}
        <MPTLFormField label="File" value={ decodeURIComponent(data.lyricsFile.split('lyrics/')[1]) } disabled />
        <MPTLButton type="warning outlined small icon-only" on:click={() => isEditingFile = !isEditingFile}>
          <svg style="--ms-button-icon-size: 16px" slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </MPTLButton>
      {:else}
        <MPTLFormField label="File (.xml)" name="file" type="file" />
        <MPTLButton type="error outlined small icon-only" on:click={() => isEditingFile = !isEditingFile}>
          <svg style="--ms-button-icon-size: 16px" slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </MPTLButton>
      {/if}
    </div>
    <div class="flex gap-sm jc-end">
      <MPTLButton on:click={(e) => promptWithoutSaving(e)} type="error outlined">Cancel</MPTLButton>
      <MPTLButton nativeType="submit" type="warning filled">Save</MPTLButton>
    </div>
  </form>
</section>
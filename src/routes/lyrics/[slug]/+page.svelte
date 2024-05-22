<script lang="ts">
  import Lyrics from '$lib/images/lyrics.png.webp';
  import { page } from '$app/stores';
  import LyricChunk from './LyricChunk.svelte';

  export let data: any = [];

  function parseTitle(title: string): string {
    return title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

  function getIdFromHeader(header: string): string {
    return header.replace(/\s/g, '-').replace('.', '').toLowerCase();
  }

  function copyUrlWithId(id: string) {
    const url = new URL($page.url.href);
    url.hash = id;
    navigator.clipboard.writeText(url.href);
    alert('Url copied to clipboard!');
  }

  const id = $page.url.href.split('#')[1] ? $page.url.href.split('#')[1] : '';
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
      <li><a href="/">Home</a></li>
      <li><a href="/lyrics">Lyrics</a></li>
      <li class="is-active">{ parseTitle(data.header[0].title) }</li>
    </ul>
  </nav>
</section>

<section class="grid cols-1 @medium:cols-2">
  <section class="mptl-lyrics-section mt-xl">
    <div style="margin: 0 auto;">
      <div class="mb-lg">
        <h2 class="title">{ parseTitle(data.header[0].title) }</h2>
        <p class="body">{ data.header[0].artist }</p>
      </div>
      {#each data.lyrics as lyric}
        <LyricChunk
          id={id}
          lyric={lyric}
        />
      {/each}
    </div>
  </section>
  <section>
    <h2 class="title mt-xl">References</h2>
    {#if data.references.length <= 0}
      <p>No references to show.</p>
    {:else}
      <ul class="mptl-references">
        {#each data.references as reference}
          <li class="flex flow-row gap-sm ai-center">
            <a href={reference.url} class="ms-link" target="_blank">{ reference.title }</a>
            <svg style="width: 16px; height: 16px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="var(--ms-theme-accent-600)" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>

          </li>
        {/each}
      </ul>
    {/if}
  </section>
</section>
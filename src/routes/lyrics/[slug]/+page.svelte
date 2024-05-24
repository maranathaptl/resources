<script lang="ts">
  import Lyrics from '$lib/images/lyrics.png.webp';
  import { page } from '$app/stores';
  import LyricChunk from './LyricChunk.svelte';
  import MPTLReferences from '$components/MPTLReferences.svelte';

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
  <MPTLReferences data={data.references} db="lyrics" id={data.lyricsId} />
</section>
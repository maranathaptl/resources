<script lang="ts">
  import Lyrics from '$lib/images/lyrics.png';
  import { page } from '$app/stores';

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

<section class="mptl-lyrics-section mt-xl">
  <div style="margin: 0 auto;">
    <h2 class="title mb-lg @large:align-center">{ parseTitle(data.header[0].title) }</h2>
    {#each data.lyrics as lyric}
      <div
        class={`mptl-lyric-chunk mb-md${ id === getIdFromHeader(lyric.header) ? ' highlighted' : '' }`}
        style="cursor: pointer;" on:click={() => copyUrlWithId(getIdFromHeader(lyric.header))}
      >
        <p class="@large:align-center" id={getIdFromHeader(lyric.header)}>
          {@html lyric.content}
        </p>
      </div>
    {/each}
  </div>
</section>
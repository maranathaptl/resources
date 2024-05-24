<script lang="ts">
  import Lyrics from '$lib/images/lyrics.png.webp';
  import MPTLFormField from '$components/MPTLFormField.svelte';
  import { page } from '$app/stores';
  import MPTLButton from '$components/MPTLButton.svelte';
  import { goto } from '$app/navigation';

  export let data;

  $: reactiveData = data;

  let value = $page.url.searchParams.get('q') || '';

  function parseForUrl(title: string): string {
    return title.toLowerCase().replaceAll(/[,.\-\/]/g, '').replaceAll(' ', '-').replaceAll('--', '-');
  }

  function handleSearch() {
    goto(`/lyrics?q=${value}`);
  }

</script>

<svelte:head>
  <title>Lyrics - Maranatha Resources</title>
  <meta name="description" content="Lyrics - Maranatha Resources"/>
  <meta property="og:image" content={Lyrics} />
  <meta name="twitter:image" content={Lyrics} />
</svelte:head>

<section class="mptl-pathbar">
  <nav aria-label="pathbar">
    <ul class="mptl-pathbar__wrapper">
      <li><a href="/">Home</a></li>
      <li class="is-active">Lyrics</li>
    </ul>
  </nav>
</section>

<h1 class="title">Lyrics</h1>
<form class="flex flow-row wrap-none gap-sm ai-center" on:submit={() => handleSearch()}>
  <MPTLFormField label="Search lyrics" bind:value name="q" />
  <MPTLButton nativeType="submit" type="outlined icon-only">
    <span class="grid pi-center" slot="icon">
      <svg style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </span>
  </MPTLButton>
</form>
<section class="grid-container">
  {#each reactiveData.files as item}
    <a href={`/lyrics/${parseForUrl(item.title)}--${item.id}`}>
      <div class="ms-card is-hoverable">
        <header class="ms-card__header">
          <div class="ms-card__mast">
            <p class="weight-bold truncate-1">{item.title}</p>
            <small class="small">{item.artist === 'Unknown' ? 'Unknown Artist' : item.artist }</small>
          </div>
        </header>
      </div>
    </a>
  {/each}
</section>
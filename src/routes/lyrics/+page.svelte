<script lang="ts">
  import { createSearchStore, searchHandler } from '$lib/stores/search';
  import { onDestroy } from 'svelte';
  import MPTLFormField from '$components/MPTLFormField.svelte';

  export let data;

  const searchLyrics = data.files.map((file) => ({
    ...file,
    searchTerms: `${file.name}`
  }));

  const searchStore = createSearchStore(searchLyrics);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => unsubscribe());
</script>

<svelte:head>
  <title>Lyrics - Maranatha Resources</title>
  <meta name="description" content="Lyrics - Maranatha Resources"/>
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
<MPTLFormField label="Search lyrics" bind:value={$searchStore.search} />
<section class="grid-container">
  {#each $searchStore.filtered.slice(0, 48) as file}
    <a href={`/lyrics/${file.name.replace('.xml', '')}`}>
      <div class="ms-card is-hoverable">
        <header class="ms-card__header">
          <div class="ms-card__mast">
            <p class="weight-bold truncate-1">{file.name.replaceAll(/\(([^)]+)\)|.xml/g, '').replaceAll('_', ' ').toUpperCase()}</p>
          </div>
        </header>
      </div>
    </a>
  {/each}
</section>
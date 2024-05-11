<script lang="ts">
  import MPTLFormField from '$components/MPTLFormField.svelte';
  import { page } from '$app/stores';
  import MPTLButton from '$components/MPTLButton.svelte';

  export let data;

  let value = $page.url.searchParams.get('q') || '';

  function handleSearch() {
    window.location.href = `/lyrics?q=${value}`;
  }
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
<form class="flex flow-row wrap-none gap-sm" on:submit={() => handleSearch()}>
  <MPTLFormField label="Search lyrics" bind:value name="q" />
  <MPTLButton nativeType="submit" type="outlined small">Search</MPTLButton>
</form>
<section class="grid-container">
  {#each data.files as file}
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
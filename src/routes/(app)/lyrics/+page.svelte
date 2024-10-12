<script lang="ts">
  import MPTLFormField from '$components/MPTLFormField.svelte';
  import { page } from '$app/stores';
  import MPTLButton from '$components/MPTLButton.svelte';
  import { goto } from '$app/navigation';
  import Lyrics from '$lib/images/lyrics.png.webp';
  import { browser } from '$app/environment';

  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  let currPage = $state($page.url.searchParams.get('p') || '1');
  let value = $state($page.url.searchParams.get('q') || '');
  let staticValue: string = $state('');

  let files = $derived(data.files);
  let count = $derived(data.count);

  $effect(() => {
    const url = new URL(window.location.href);
    url.searchParams.append('p', currPage);
  })

  function parseForUrl(title: string): string {
    return title
      .toLowerCase()
      .replace(/[,./-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }

  function nextPage(e: Event) {
    if (browser) {
      e.preventDefault();
      const url = new URL(window.location.href);
      currPage = (parseInt(currPage) + 1).toString();
      url.searchParams.set('p', parseInt(currPage).toString());
      const newUrl = url.pathname + url.search;
      goto(newUrl, { keepFocus: true });
    }
  }

  function prevPage(e: Event) {
    if (browser) {
      e.preventDefault();
      const url = new URL(window.location.href);
      currPage = (parseInt(currPage) - 1).toString();
      url.searchParams.set('p', parseInt(currPage).toString());
      const newUrl = url.pathname + url.search;
      goto(newUrl, { keepFocus: true });
    }
  }

  function handleSearch() {
    if (browser) {
      const url = new URL(window.location.href);
      if (value === '') {
        if (url.searchParams.has('q')) {
          url.searchParams.delete('q');
          return;
        }
      } else {
        staticValue = value.toString();
        url.searchParams.set('q', staticValue);
        const newUrl = url.pathname + url.search;
        goto(newUrl, { keepFocus: true });
      }
    }
  }

  function handlePageChange(e: Event) {
    if (browser) {
      e.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set('p', currPage);
      const newUrl = url.pathname + url.search;
      goto(newUrl, { keepFocus: true });
    }
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
<form class="flex flow-row wrap-none gap-sm ai-center" onsubmit={() => handleSearch()}>
  <MPTLFormField label="Search lyrics" bind:value name="q" />
  <MPTLButton nativeType="submit" type="outlined icon-only">
    {#snippet icon()}
      <svg style="width: 16px; height: 16px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    {/snippet}
  </MPTLButton>
</form>

{#if files.length > 0}
  <form onsubmit={(e) => handlePageChange(e)}>
    <section class="w-full flex gap-sm jc-center ai-center">
      <MPTLButton nativeType="button" type="outlined icon-only" isDisabled={parseInt(currPage) - 1 === 0} onclick={(e) => prevPage(e)}>
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        {/snippet}
      </MPTLButton>
      <input type="text" bind:value={currPage} style="padding: 0.5rem; width: calc(3ch + 1rem); font-size: 14px"> / <span>{Math.ceil(count / 27)}</span>
      <MPTLButton nativeType="button" type="outlined icon-only" isDisabled={Math.ceil(count / 27) === parseInt(currPage)} onclick={(e) => nextPage(e)}>
        {#snippet icon()}
          <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        {/snippet}
      </MPTLButton>
    </section>
  </form>
{/if}

{#if files.length > 0}
  <section class="grid-container">
    {#each files as item}
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
{:else}
  <p class="align-center my-xl">No lyrics found with the terms "{staticValue}".</p>
{/if}
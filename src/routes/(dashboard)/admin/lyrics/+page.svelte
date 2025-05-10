<script lang="ts">
  import MPTLFormField from '$components/MPTLFormField.svelte';
  import { page } from '$app/state';
  import MPTLButton from '$components/MPTLButton.svelte';
  import { goto } from '$app/navigation';
  import Lyrics from '$lib/images/lyrics.png.webp';
  import { browser } from '$app/environment';
  import { supabase } from '$lib/supabase';

  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  let currPage = $state(page.url.searchParams.get('p') || '1');
  let value = $state(page.url.searchParams.get('q') || '');
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

  function deleteLyrics(id: number) {
    if (browser) {
      supabase
        .from('lyrics')
        .delete()
        .eq('id', id)
        .then(() => {
          const url = new URL(window.location.href);
          goto(url.pathname + url.search);
        });
    }
  }
</script>

<svelte:head>
  <title>Manage Lyrics - Maranatha Resources</title>
  <meta name="description" content="Manage Lyrics - Maranatha Resources"/>
  <meta property="og:image" content={Lyrics} />
  <meta name="twitter:image" content={Lyrics} />
</svelte:head>

<section class="mptl-pathbar">
  <nav aria-label="pathbar">
    <ul class="mptl-pathbar__wrapper">
      <li><a href="/admin">Home</a></li>
      <li class="is-active">Lyrics</li>
    </ul>
  </nav>
</section>

<section class="dynamic-header">
  <form class="w-full flex flow-row wrap-none gap-sm ai-center" onsubmit={() => handleSearch()}>
    <MPTLFormField label="Search lyrics" bind:value name="q" />
    <MPTLButton nativeType="submit" type="outlined icon-only">
      {#snippet icon()}
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      {/snippet}
    </MPTLButton>
  </form>
  <MPTLButton type="outlined" link="/admin/lyrics/add">
    {#snippet icon()}
      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    {/snippet}
    Add
  </MPTLButton>
</section>

{#if files.length > 0}
  <form onsubmit={(e) => handlePageChange(e)}>
    <section class="w-full flex gap-sm jc-center ai-center">
      <MPTLButton type="outlined icon-only" isDisabled={parseInt(currPage) - 1 === 0} onclick={(e) => prevPage(e)}>
        {#snippet icon()}
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        {/snippet}
      </MPTLButton>
      <input type="text" bind:value={currPage} style="padding: 0.5rem; width: calc(3ch + 1rem); font-size: 14px"> / <span>{Math.ceil(count / 27)}</span>
      <MPTLButton type="outlined icon-only" isDisabled={Math.ceil(count / 27) === parseInt(currPage)} onclick={(e) => nextPage(e)}>
        {#snippet icon()}
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
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
      <div class="ms-card">
        <header class="ms-card__header">
          <div class="ms-card__mast" style="max-width: calc(100% - 120px)">
            <p class="weight-bold truncate-1" title="{item.title}">{item.title}</p>
            <small class="small truncate-1">{item.artist === 'Unknown' ? 'Unknown Artist' : item.artist }</small>
          </div>
          <div class="flex flow-row wrap-none gap-sm h-min">
            <MPTLButton link={`/admin/lyrics/edit/${parseForUrl(item.title)}--${item.id}`} type="warning filled small icon-only">
              {#snippet icon()}
                <svg style="--ms-button-icon-size: 16px"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              {/snippet}
            </MPTLButton>
            <MPTLButton onclick={() => deleteLyrics(item.id)} type="error filled small icon-only">
              {#snippet icon()}
                <svg style="--ms-button-icon-size: 16px"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              {/snippet}
            </MPTLButton>
          </div>
        </header>
      </div>
    {/each}
  </section>
{:else}
  <p class="align-center my-xl">No lyrics found with the terms "{staticValue}".</p>
{/if}
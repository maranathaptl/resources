<script lang="ts">
  import SheetMusic from '$lib/images/sheet-music.png.webp';

  export let data;
</script>

<svelte:head>
  <title>{ data.pieceName } Sheet Music - Maranatha Resources</title>
  <meta name="description" content={`${ data.pieceName } Sheet Music - Maranatha Resources`}/>
  <meta property="og:image" content={SheetMusic} />
  <meta name="twitter:image" content={SheetMusic} />
</svelte:head>

<section class="mptl-pathbar">
  <nav aria-label="pathbar">
    <ul class="mptl-pathbar__wrapper">
      <li><a href="/">Home</a></li>
      <li><a href="/sheet-music">Sheet Music</a></li>
      <li>{ data.pieceName }</li>
    </ul>
  </nav>
</section>

<h1 class="title">{ data.pieceName }</h1>
{#if data.files.length !== 0}
  <section class="grid-container">
    {#each data.files as file}
      <a href={`${file.url}`} target="_blank">
        <div class="ms-card is-hoverable">
          <header class="ms-card__header">
            <div class="ms-card__mast flex wrap-none ai-center gap-sm">
              <div style="width: 24px; height: 24px">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <p class="truncate-1">{file.name.replace('.pdf', '').replace('-', ' - ').replace('_', ' ')}</p>
            </div>
          </header>
        </div>
      </a>
    {/each}
  </section>
{:else}
  <section class="grid pi-center w-full p-xl @large:p-2xl">
    <p class="subtitle weight-light align-center">No files found</p>
  </section>
{/if}

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
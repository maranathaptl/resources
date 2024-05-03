<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Sheet Music - Maranatha Resources</title>
  <meta name="description" content="Sheet Music - Maranatha Resources"/>
</svelte:head>

<section class="mptl-pathbar">
  <nav aria-label="pathbar">
    <ul class="mptl-pathbar__wrapper">
      <li><a href="/">Home</a></li>
      <li class="is-active">Sheet Music</li>
    </ul>
  </nav>
</section>

<h1 class="title">Sheet Music</h1>
<section class="grid cols-1 @medium:cols-2 @large:cols-3 gap-sm @medium:gap-md">
  {#each data.sheets as sheet}
    <a href={`/sheet-music/${sheet.slug.toString()}`}>
      <div class="ms-card is-hoverable">
        <header class="ms-card__header">
          <div class="ms-card__mast">
            <p class="subtitle truncate-1">{sheet.piece}</p>
          </div>
        </header>
      </div>
    </a>
  {/each}
</section>
<script>
  import MPTLTile from '$components/MPTLTile.svelte';
  import Lyrics from '$lib/images/lyrics.png';
  import LyricsLowRes from '$lib/images/lyrics.png.webp';
  import Guidelines from '$lib/images/guidelines.png.webp';
</script>

<svelte:head>
  <title>Admin - Maranatha Resources</title>
  <meta name="description" content="Admin - Maranatha Resources"/>
  <meta property="og:image" content={Guidelines} />
  <meta name="twitter:image" content={Guidelines} />
</svelte:head>

<h1 class="title">Admin Dashboard</h1>
<p class="body">You can do anything to modify the content that goes on the main resources page.</p>

<section class="grid-container">
  <MPTLTile
    title="Manage Lyrics"
    media={Lyrics}
    lowResMedia={LyricsLowRes}
    mediaAlt="Lyrics hero"
    link="/admin/lyrics"
  />
</section>
<script>
  import MPTLTile from '$components/MPTLTile.svelte';
  import Lyrics from '$lib/images/lyrics.png';
  import LyricsLowRes from '$lib/images/lyrics.png.webp';
</script>

<h1 class="title">Admin Dashboard</h1>
<p class="body">You can do anything to modify the content that goes on the main resources page.</p>

<section class="grid-container">
  <MPTLTile
    title="Add Lyrics"
    media={Lyrics}
    lowResMedia={LyricsLowRes}
    mediaAlt="Lyrics hero"
    link="/admin/add-lyrics"
  />
</section>
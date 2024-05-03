<script lang="ts">
  import SheetMusic from '$lib/images/sheet-music.png';
  import Chords from '$lib/images/chords.png';
  import Lyrics from '$lib/images/lyrics.png';
  import Recordings from '$lib/images/recording.png';
  import Choreography from '$lib/images/choreography.png';
  import Guidelines from '$lib/images/guidelines.png';

  import MPTLTile from '$components/MPTLTile.svelte';
</script>

<svelte:head>
  <title>Maranatha Resources</title>
  <meta name="description" content="Maranatha Resources"/>
</svelte:head>

<section class="grid-container">
  <MPTLTile
    title="Chords"
    media={Chords}
    mediaAlt="Chords hero"
    isLocked
  />
  <MPTLTile
    title="Lyrics"
    media={Lyrics}
    mediaAlt="Lyrics hero"
    isLocked
  />
  <MPTLTile
    title="Recordings"
    media={Recordings}
    mediaAlt="Recordings hero"
    isLocked
  />
  <MPTLTile
    title="Sheet Music"
    media={SheetMusic}
    mediaAlt="Sheet Music hero"
    link="/sheet-music"
  />
  <MPTLTile
    title="Choreography"
    media={Choreography}
    mediaAlt="Choreography hero"
    isLocked
  />
  <MPTLTile
    title="Guidelines"
    media={Guidelines}
    mediaAlt="Guidelines hero"
    isLocked
  />
</section>
<script lang="ts">
  import SheetMusic from '$lib/images/sheet-music.png';
  import Chords from '$lib/images/chords.png';
  import Lyrics from '$lib/images/lyrics.png';
  import Recordings from '$lib/images/recording.png';
  import Choreography from '$lib/images/choreography.png';
  import Guidelines from '$lib/images/guidelines.png';

  // Low res images
  import SheetMusicLowRes from '$lib/images/sheet-music.png.webp';
  import ChordsLowRes from '$lib/images/chords.png.webp';
  import LyricsLowRes from '$lib/images/lyrics.png.webp';
  import RecordingsLowRes from '$lib/images/recording.png.webp';
  import ChoreographyLowRes from '$lib/images/choreography.png.webp';
  import GuidelinesLowRes from '$lib/images/guidelines.png.webp';

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
    lowResMedia={ChordsLowRes}
    mediaAlt="Chords hero"
    isLocked
  />
  <MPTLTile
    title="Lyrics"
    media={Lyrics}
    lowResMedia={LyricsLowRes}
    mediaAlt="Lyrics hero"
    link="/lyrics"
  />
  <MPTLTile
    title="Recordings"
    media={Recordings}
    lowResMedia={RecordingsLowRes}
    mediaAlt="Recordings hero"
    isLocked
  />
  <MPTLTile
    title="Sheet Music"
    media={SheetMusic}
    lowResMedia={SheetMusicLowRes}
    mediaAlt="Sheet Music hero"
    link="/sheet-music"
  />
  <MPTLTile
    title="Choreography"
    media={Choreography}
    lowResMedia={ChoreographyLowRes}
    mediaAlt="Choreography hero"
    isLocked
  />
  <MPTLTile
    title="Guidelines"
    media={Guidelines}
    lowResMedia={GuidelinesLowRes}
    mediaAlt="Guidelines hero"
    isLocked
  />
</section>
<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { db } from '$lib/db';
  import { sheet_music } from "$lib/schema";

  function getSheetMusic(file: string) {
    return supabase.storage.from('sheet-music').getPublicUrl(file);
  }

  // const data = await db.select().from(sheet_music);
  // console.log(data);
</script>

<svelte:head>
  <title>Sheet Music - Maranatha Resources</title>
  <meta name="description" content="Sheet Music - Maranatha Resources"/>
</svelte:head>

<h1 class="title">Sheet Music</h1>
<section class="flex flow-column gap-sm">
  <div class="ms-card">
    <header class="ms-card__header">
      <div class="ms-card__mast">
        <h2 class="ms-card__title">CARD TITLE</h2>
        <p class="ms-card__subtitle">Card Subtitle.</p>
      </div>
    </header>
  </div>
</section>
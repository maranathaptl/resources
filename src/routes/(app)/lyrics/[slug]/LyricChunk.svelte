<script lang="ts">
  import MPTLButton from '$components/MPTLButton.svelte';
  import { page } from '$app/stores';
  import type { LyricsResult } from '$lib/types';

  $: isHovered = false;

  export let id: string;
  export let lyric: LyricsResult;

  function getIdFromHeader(header: string): string {
    return header.replace(/\s/g, '-').replace('.', '').toLowerCase();
  }

  function copyUrlWithId(id: string) {
    const url = new URL($page.url.href);
    url.hash = getIdFromHeader(id);
    navigator.clipboard.writeText(url.href);
    alert('Url copied to clipboard!');
  }

  $: isHighlighted = id.toLowerCase() === getIdFromHeader(lyric.header);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="mptl-lyric-chunk mb-md"
  class:highlighted={isHighlighted}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  <p id={getIdFromHeader(lyric.header)}>
    {@html lyric.content}
  </p>
  <div class="none" style="width: fit-content; position: relative;" class:block={isHovered}>
    <MPTLButton type="icon-only" on:click={() => copyUrlWithId(lyric.header)}>
      <span class="grid pi-center" slot="icon">
        <svg style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
        </svg>
      </span>
    </MPTLButton>
  </div>
</div>
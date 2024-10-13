<script lang="ts">
  import MPTLButton from '$components/MPTLButton.svelte';
  import { page } from '$app/stores';
  import type { LyricsResult } from '$lib/types';

  let { id, lyric, ...props }: { id: string, lyric: LyricsResult } = $props();
  let isHovered: boolean = $state(false);
  let isHighlighted: boolean = $state(id.toLowerCase() === getIdFromHeader(lyric.header));

  function getIdFromHeader(header: string): string {
    return header.replace(/\s/g, '-').replace('.', '').toLowerCase();
  }

  function copyUrlWithId(id: string) {
    const url = new URL($page.url.href);
    url.hash = getIdFromHeader(id);
    navigator.clipboard.writeText(url.href);
    alert('Url copied to clipboard!');
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="mptl-lyric-chunk mb-md"
  class:highlighted={isHighlighted}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  {...props}
>
  <p id={getIdFromHeader(lyric.header)}>
    {@html lyric.content}
  </p>
  <div class="none" style="width: fit-content; position: relative;" class:block={isHovered}>
    <MPTLButton type="icon-only" onclick={() => copyUrlWithId(lyric.header)}>
      {#snippet icon()}
        <span class="grid pi-center">
          <svg style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
        </span>
      {/snippet}
    </MPTLButton>
  </div>
</div>
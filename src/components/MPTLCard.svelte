<script lang="ts">
  import { handleLinkTarget, handleVariants } from '$lib/helpers';
  import type { Optional } from '$lib/types';

  export let type: Optional<string>;
  export let link: Optional<string>;
</script>

{#if link}
  <a href={link} target={handleLinkTarget(link)}>
    <div class={`ms-card${ handleVariants(type) }`}>
      <slot />
    </div>
  </a>
{:else}
  <div class={`ms-card${ handleVariants(type) }`}>
    <slot />
  </div>
{/if}
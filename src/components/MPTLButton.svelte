<script lang="ts">
  import { handleLinkTarget, handleVariants } from '$lib/helpers';
  import type { Optional } from '$lib/types';

  export let type: Optional<string> = undefined;
  export let link: Optional<string> = undefined;
  export let nativeType: Optional<'button'|'submit'|'reset'> = undefined;
  export let isDisabled: boolean = false;
</script>

{#if !link}
  <button class={`ms-button${ handleVariants(type) }`} type={nativeType} disabled={isDisabled} on:click>
    {#if $$slots.icon}
      <i class="ms-button__icon">
        <slot name="icon" />
      </i>
    {/if}
    {#if $$slots.default}
      <span class="ms-button__label"><slot /></span>
    {/if}
  </button>
{:else}
  <a class={`ms-button${ handleVariants(type) }${ isDisabled ? ' is-disabled' : '' }`} href={link} target={handleLinkTarget(link)}>
    {#if $$slots.icon}
      <i class="ms-button__icon">
        <slot name="icon" />
      </i>
    {/if}
    {#if $$slots.default}
      <span class="ms-button__label"><slot /></span>
    {/if}
  </a>
{/if}

<style lang="scss">
  .ms-button__icon {
    display: grid;
    place-items: center;
  }
</style>
<script lang="ts">
  import { handleLinkTarget, handleVariants } from '$lib/helpers';
  import type { Optional } from '$lib/types';

  let {
    children,
    icon,
    class: CLASS,
    type,
    link,
    nativeType,
    onclick,
    isDisabled = false,
    ...props
  } : {
    children: Optional<any>,
    icon: Optional<any>
    class: Optional<any>,
    type: Optional<string>,
    link: Optional<string>,
    nativeType: Optional<'button'|'submit'|'reset'>,
    onclick: Optional<(e: any) => void>,
    isDisabled: boolean
  } = $props();
</script>

{#snippet BUTTON_BASE()}
  {#if icon}
    <i class="ms-button__icon">
      {@render icon()}
    </i>
  {/if}
  {#if children}
    <span class="ms-button__label">
      {@render children()}
    </span>
  {/if}
{/snippet}

{#if !link}
  <button class={`ms-button${ handleVariants(type) }${ CLASS ? ' ' + CLASS : '' }`} {...props} {onclick} type={nativeType} disabled={isDisabled}>
    {@render BUTTON_BASE()}
  </button>
{:else}
  <a class={`ms-button${ handleVariants(type) }${ CLASS ? ' ' + CLASS : '' }${ isDisabled ? ' is-disabled' : '' }`} {...props} aria-disabled={isDisabled} href={link} target={handleLinkTarget(link)}>
    {@render BUTTON_BASE()}
  </a>
{/if}

<style lang="scss">
  .ms-button__icon {
    display: grid;
    place-items: center;
  }
</style>
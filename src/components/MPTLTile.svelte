<script lang="ts">
  import type { Optional } from "$lib/types";

  export let title: string;
  export let media: string|any;
  export let lowResMedia: Optional<string> = undefined;
  export let mediaAlt: string;
  export let link: Optional<string> = undefined;
  export let isLocked: boolean = false;
</script>

{#if !link}
  <div class={`mptl-tile${ isLocked ? ' is-locked' : '' }`} style={`--mptl-tile-background-image: url("${ lowResMedia }")`}>
    <div class="mptl-tile__overlay">
      {#if isLocked}
        <i class="mptl-tile__icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </i>
      {/if}
      <h3 class="subtitle">{title}</h3>
    </div>
    <img src={media} alt={mediaAlt}/>
  </div>
{:else}
  <a href={link}>
    <div class={`mptl-tile${ isLocked ? ' is-locked' : '' }`} style={`--mptl-tile-background-image: url("${ lowResMedia }")`}>
      <div class="mptl-tile__overlay">
        {#if isLocked}
          <i class="mptl-tile__icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </i>
        {/if}
        <h3 class="subtitle">{title}</h3>
      </div>
      <img src={media} alt={mediaAlt}/>
    </div>
  </a>
{/if}
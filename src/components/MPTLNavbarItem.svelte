<script lang="ts">
  import { page } from '$app/stores';

  export let link: string;

  $: isActive = $page.url.pathname === link;
</script>

<li class="mptl-navbar__item" class:is-active={isActive}>
  <a href="/">
    <slot />
  </a>
</li>
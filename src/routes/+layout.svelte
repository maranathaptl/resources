<script lang="ts">
  import { page } from '$app/state';
  import '$styles/main.scss';
  import MPTLNavbarItem from '$components/MPTLNavbarItem.svelte';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<div class="app">
  <section class="flex flow-column gap-xl wrap-none">
    <header class="pt-xl px-xl @large:pt-2xl">
      <section class="w-full max-w-xl mx-auto flex flow-column @medium:flow-row wrap-none gap-md jc-space-between ai-center">
        <a href="/" class="inline-block flex ai-center gap-sm">
          <h1 class="title">Maranatha Resources</h1>
        </a>
        {#if page.url.pathname !== '/'}
          <nav class="mptl-navbar">
            <ul class="flex ai-center gap-md" style="list-style: none">
              <MPTLNavbarItem link="/">Home</MPTLNavbarItem>
              <MPTLNavbarItem link="/">Chords</MPTLNavbarItem>
              <MPTLNavbarItem link="/lyrics">Lyrics</MPTLNavbarItem>
              <MPTLNavbarItem link="/">Recordings</MPTLNavbarItem>
            </ul>
          </nav>
        {/if}
      </section>
    </header>
    <main class="content-wrap">
      {@render children()}
    </main>
  </section>

  <footer class="flex flow-column jc-center ai-center py-2xl">
    <small class="small align-center">
      Copyright &copy; { new Date().getFullYear() } Maranatha PTL Club of The Philippines
    </small>
    <small class="small align-center">
      <a class="ms-link" href="mailto:mghernandez@maranathaptl.org">Report a bug</a>
    </small>
  </footer>
</div>
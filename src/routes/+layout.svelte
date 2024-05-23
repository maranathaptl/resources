<script lang="ts">
  import { page } from '$app/stores';
  import '$styles/main.scss';
  import MPTLNavbarItem from '$components/MPTLNavbarItem.svelte';
</script>

<div class="app">
  <section class="flex flow-column gap-xl wrap-none">
    <header class="pt-xl px-xl @large:pt-2xl">
      <section class="w-full max-w-xl mx-auto flex flow-column @medium:flow-row wrap-none gap-md jc-space-between ai-center">
        <a href="/" class="inline-block flex ai-center gap-sm">
          <h1 class="title">Maranatha Resources</h1>
        </a>
        <nav class="mptl-navbar">
          <ul class="flex ai-center gap-md" style="list-style: none">
            <MPTLNavbarItem link="/">Home</MPTLNavbarItem>
            <MPTLNavbarItem link="mailto:webmaster@maranathaptl.org">Report a bug</MPTLNavbarItem>
          </ul>
        </nav>
      </section>
    </header>

    <main class="content-wrap">
      <slot/>
    </main>
  </section>

  <footer class="flex jc-center ai-center py-2xl">
    <small class="small align-center">
      Copyright &copy; { new Date().getFullYear() } Maranatha PTL Club of The Philippines
    </small>
  </footer>
</div>
<script lang="ts">
  import '$styles/main.scss';
  import MPTLNavbarItem from '$components/MPTLNavbarItem.svelte';

  import { goto, invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;
  $: ({ session, supabase } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (!newSession) {
        setTimeout(() => {
          goto('/admin', { invalidateAll: true });
        });
      }
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="app">
  <section class="flex flow-column gap-xl wrap-none">
    <header class="pt-xl px-xl @large:pt-2xl">
      <section class="w-full max-w-xl mx-auto flex flow-column @medium:flow-row wrap-none gap-md jc-space-between ai-center">
        <a href="/admin" class="inline-block flex ai-center gap-sm">
          <h1 class="title">Maranatha Resources</h1>
        </a>
        <nav class="mptl-navbar">
          <ul class="flex ai-center gap-md" style="list-style: none">
            <MPTLNavbarItem link="/admin/add-lyrics">Add Lyrics</MPTLNavbarItem>
            <!--<MPTLNavbarItem link="/admin/add-chords">Add Chords</MPTLNavbarItem>
            <MPTLNavbarItem link="/admin/add-sheet-music">Add Sheet Music</MPTLNavbarItem>
            <MPTLNavbarItem link="/admin/add-recordings">Recordings</MPTLNavbarItem>-->
          </ul>
        </nav>
      </section>
    </header>

    <main class="content-wrap">
      <slot/>
    </main>
  </section>

  <footer class="flex flow-column jc-center ai-center py-2xl">
    <small class="small align-center">
      Copyright &copy; { new Date().getFullYear() } Maranatha PTL Club of The Philippines
    </small>
    <small class="small align-center">
      <a class="ms-link" href="mailto:webmaster@maranathaptl.org">Report a bug</a>
    </small>
  </footer>
</div>
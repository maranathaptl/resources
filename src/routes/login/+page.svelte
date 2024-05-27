<script lang="ts">
  import MPTLFormField from '$components/MPTLFormField.svelte';
  import Guidelines from '$lib/images/guidelines.png.webp';
  import MPTLButton from '$components/MPTLButton.svelte';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { invalidateAll } from '$app/navigation';

  export let form;

  onMount(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<svelte:head>
  <title>Admin Login - Maranatha Resources</title>
  <meta name="description" content="Admin Login - Maranatha Resources"/>
  <meta property="og:image" content={Guidelines} />
  <meta name="twitter:image" content={Guidelines} />
</svelte:head>

<h1 class="title">Login</h1>

<form method="post" class="flex flow-column gap-md p-xl r-lg fill-surface-300">
  <MPTLFormField required label="Email" type="email" name="email" error={form?.emailMissing} helper={form?.emailMissing ? 'Title field is required.' : undefined} value={form?.email ? form?.email : ''} />
  <MPTLFormField required label="Password" type="password" name="password" error={form?.passwordMissing} helper={form?.passwordMissing ? 'Title field is required.' : undefined} />

  <span class="w-full flex jc-end">
    <MPTLButton nativeType="submit" type="filled">Login</MPTLButton>
  </span>
</form>
<script lang="ts">
import Lyrics from '$lib/images/lyrics.png.webp';
import MPTLFormField from '$components/MPTLFormField.svelte';
import MPTLButton from '$components/MPTLButton.svelte';

export let form;
</script>

<svelte:head>
  <title>Add Lyrics - Maranatha Resources</title>
  <meta name="description" content="Add Lyrics - Maranatha Resources"/>
  <meta property="og:image" content={Lyrics} />
  <meta name="twitter:image" content={Lyrics} />
</svelte:head>

<section class="mptl-pathbar">
  <nav aria-label="pathbar">
    <ul class="mptl-pathbar__wrapper">
      <li><a href="/admin">Home</a></li>
      <li><a href="/admin/lyrics">Lyrics</a></li>
      <li class="is-active">Add Lyrics</li>
    </ul>
  </nav>
</section>

<h1 class="title">Add Lyrics</h1>

<form method="post" enctype="multipart/form-data" class="flex flow-column gap-md p-xl r-lg fill-surface-300">
  <MPTLFormField required label="Title" type="text" name="title" error={form?.titleMissing} helper={form?.titleMissing ? 'Title field is required.' : undefined} value={form?.title ? form?.title : ''} />
  <MPTLFormField required label="Artist" type="text" name="artist" error={form?.artistMissing} helper={form?.artistMissing ? 'Artist field is required.' : 'Put \'Unknown Artist\' if there are no known artists.'} value={form?.artist ? form?.artist : ''} />
  <label class="flex flow-column gap-sm py-md px-lg r-sm" class:ink-error-400={form?.fileMissing} style={`border: 2px solid var(--ms-theme-${ form?.fileMissing ? 'error' : 'surface' }-400);`}>
    <span class="small weight-normal">File (.xml)</span>
    <input type="file" required name="file" accept="text/xml" value={form?.file ? form?.file : null} />
  </label>
  <span class="w-full flex jc-end">
    <MPTLButton nativeType="submit" type="filled">Submit</MPTLButton>
  </span>
</form>
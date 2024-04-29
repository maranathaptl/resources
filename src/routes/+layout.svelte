<script lang="ts">
</script>

<div class="app">

	<main class="content-wrap">
		<slot />
	</main>

	<footer>

	</footer>
</div>

<style lang="scss">
@use '@matteusan/himig';
@use '@matteusan/himig/ms-button';
@use '@matteusan/himig/ms-utils';

@include himig.init();

@include ms-button.render();

@include ms-utils.layout();
@include ms-utils.struct();
@include ms-utils.typography();
</style>

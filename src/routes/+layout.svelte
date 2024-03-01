<script lang="ts">
	import '../app.pcss';
	import LocaleSelectorPresenter from '../presenters/LocaleSelectorPresenter.svelte';
</script>

<div class="absolute right-0 top-0 m-4">
	<LocaleSelectorPresenter />
</div>

<slot />

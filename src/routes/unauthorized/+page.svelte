<script>
	import ErrorView from '../../views/ErrorView.svelte';
	import { t } from 'svelte-i18n';
</script>

<ErrorView errorMessage={$t('accessDenied')} />

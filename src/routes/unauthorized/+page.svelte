<script>
	import { t } from 'svelte-i18n';
	import StatusView from '../../views/StatusView.svelte';
</script>

<StatusView message={$t('accessDenied')} viewType="error" />

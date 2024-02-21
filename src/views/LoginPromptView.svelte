<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-4">
	<p
		class="bg-gradient-to-br from-primary-500 to-primary-100 bg-clip-text text-center text-2xl font-bold text-transparent"
	>
		{$t('logInToContinue')}
	</p>
	<a
		href="/login"
		class="inline-block cursor-pointer rounded-full border-2 border-primary-500 px-6 py-3 hover:bg-primary-900"
	>
		{$t('login')}
	</a>
</div>

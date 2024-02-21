<!-- svelte-ignore a11y-missing-attribute -->
<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { t } from 'svelte-i18n';

	export let metaData: any;
	export let extraApplicationData: any;
	export let onChangeStatus: (data: any) => void = (data: any) => {
		console.warn('No action provided');
	};

	let bindGroup = metaData.detail[2] + ' ' + extraApplicationData[0].competence_profile_id;
</script>

<div class="card mx-auto mt-4 w-1/3 p-4">
	<header>
		<h3 class="h3 mb-8 border-2 text-center">
			{$t('competenceProfileId')} : {extraApplicationData[0].competence_profile_id}
		</h3>
	</header>
	<p class="m-2">{$t('name')}: {metaData.detail[0]}</p>
	<p class="m-2">{$t('job')}: {metaData.detail[1]}</p>
	<p class="m-2">{$t('experience')}: {extraApplicationData[0].formatYearsOfExperience()}</p>
	<p class="m-2 text-center">{$t('availability')}:</p>
	{#each extraApplicationData[1] as availability}
		<p class="m-2 text-center">
			{availability.from_date.split('T')[0]} - {availability.to_date.split('T')[0]}
		</p>
	{/each}

	<p class="m-2 text-center">
		Status:
		<RadioGroup display="flex" active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem
				on:change={onChangeStatus}
				bind:group={metaData.detail[2]}
				name="status"
				value={'rejected ' + extraApplicationData[0].competence_profile_id}
				>{$t('rejected')}</RadioItem
			>
			<RadioItem
				on:change={onChangeStatus}
				bind:group={metaData.detail[2]}
				name="status"
				value={'unhandled ' + extraApplicationData[0].competence_profile_id}
				>{$t('unhandled')}</RadioItem
			>
			<RadioItem
				on:change={onChangeStatus}
				bind:group={metaData.detail[2]}
				name="status"
				value={'accepted ' + extraApplicationData[0].competence_profile_id}
				>{$t('accepted')}</RadioItem
			>
		</RadioGroup>
	</p>
</div>

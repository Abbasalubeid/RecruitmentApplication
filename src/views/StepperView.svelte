<script lang="ts">
	import { Stepper, Step, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let expertise: Array<{ competence_id: number; name: string }> = [];
	export let onAddExperience: (expertise: [number, string], years: number) => void;
	export let onAddAvailability: (startDay: string, endDay: string) => void;
	export let onCompleteHandler: () => void;
	export let addedExperiences: Array<{ expertise: [number, string]; years: number }> = [];
	export let addedAvailability: Array<{ startDay: string; endDay: string }> = [];
	export let errorMessage: string = '';

	let selectedExpertise: [number, string] = [0, ''];
	let yearsOfExperience: number = 0;
	let startDay: string = '';
	let endDay: string = '';
</script>

<Stepper on:complete={onCompleteHandler} class="mx-auto w-2/3">
	<form action="post">
		<Step>
			<svelte:fragment slot="header">Area of Expertise</svelte:fragment>
			<ListBox>
				{#each expertise as exp}
					<ListBoxItem
						class="bg-primary-500"
						bind:group={selectedExpertise}
						name="expertise"
						value={[exp.competence_id, exp.name]}>{exp.name}</ListBoxItem
					>
				{/each}
			</ListBox>
			<div class="w-72">
				<label class="label">
					<span>Years of experience</span>

					<input bind:value={yearsOfExperience} class="input pl-2" type="number" placeholder="0" />
				</label>
				<br />
				<button
					class="select-none rounded-lg bg-primary-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
					on:click={() => onAddExperience(selectedExpertise, yearsOfExperience)}
				>
					Add experience
				</button>
			</div>

			<ul class="list mx-auto w-1/2">
				<div class="text-center">
					<span class="text-lg font-bold">Your added experiences:</span>
				</div>

				{#each addedExperiences as experience}
					<li class="mb-4 flex space-x-4 rounded-lg bg-primary-500 p-4">
						<span class="font-semibold">Expertise:</span>
						<span class="">{experience.expertise[1]}</span>
						<span class="flex-grow"></span>
						<span class="flex-grow"></span>
						<span class="font-semibold">Years of experience:</span>
						<span class="flex-shrink-0">{experience.years}</span>
					</li>
				{/each}
			</ul>
		</Step>
		<Step>
			<svelte:fragment slot="header">Pick a an availability range</svelte:fragment>
			<div class="w-72">
				<label class="label">
					<span>Start Day</span>
					<input class="input pl-2" type="date" bind:value={startDay} />
				</label>years, addedExperiences
				<br />
				<label class="label">
					<span>End Day</span>
					<input class="input pl-2" type="date" bind:value={endDay} />
				</label>
			</div>
			<button
				class="select-none rounded-lg bg-primary-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
				type="button"
				on:click={() => onAddAvailability(startDay, endDay)}
			>
				Add availability
			</button>

			<ul class="list mx-auto w-1/2">
				<div class="text-center">
					<span class="text-lg font-bold">Your added availabilities:</span>
				</div>

				{#each addedAvailability as availability}
					<li class="mb-4 flex space-x-4 rounded-lg bg-primary-500 p-4">
						<span class="font-semibold">From:</span>
						<span class="">{availability.startDay.split('T')[0]}</span>
						<span class="flex-grow"></span>
						<span class="flex-grow"></span>
						<span class="font-semibold">To:</span>
						<span class="flex-shrink-0">{availability.endDay.split('T')[0]}</span>
					</li>
				{/each}
			</ul>
		</Step>
		<Step>
			<svelte:fragment slot="header">Summary</svelte:fragment>
			<div>
				<div class="text-center">
					<span class="text-lg font-bold">Your selected experiences:</span>
				</div>
				<ul class="list mx-auto w-1/2">
					{#each addedExperiences as experience}
						<li class="my-0 flex space-x-4 rounded-lg bg-primary-500 p-4">
							<span class="font-semibold">Expertise:</span>
							<span class="">{experience.expertise[1]}</span>
							<span class="flex-grow"></span>
							<span class="flex-grow"></span>
							<span class="font-semibold">Years of experience:</span>
							<span class="flex-shrink-0">{experience.years}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<div class="text-center">
					<span class="text-lg font-bold">Your selected availabilities:</span>
				</div>
				<ul class="list mx-auto w-1/2">
					{#each addedAvailability as availability}
						<li class="my-0 flex space-x-4 rounded-lg bg-primary-500 p-4">
							<span class="font-semibold">From:</span>
							<span class="">{availability.startDay.split('T')[0]}</span>
							<span class="flex-grow"></span>
							<span class="flex-grow"></span>
							<span class="font-semibold">To:</span>
							<span class="flex-shrink-0">{availability.endDay.split('T')[0]}</span>
						</li>
					{/each}
				</ul>
			</div>
		</Step>
	</form>
</Stepper>

{#if errorMessage}
	<div>{errorMessage}</div>
{/if}

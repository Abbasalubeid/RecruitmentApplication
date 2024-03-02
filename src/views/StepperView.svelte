<script lang="ts">
	import { Stepper, Step, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	/**
	 * Array of expertise objects.
	 * @type {Array<{ id: number; name: string }>}
	 */
	export let expertise: Array<{ id: number; name: string }> = [];

	/**
	 * Callback function invoked when adding experience.
	 * @type {(expertise: string, years: number) => void}
	 */
	export let onAddExperience: (expertise: string, years: number) => void;

	/**
	 * Callback function invoked when adding availability.
	 * @type {(startDay: number, endDay: number) => void}
	 */
	export let onAddAvailability: (startDay: number, endDay: number) => void;

	/**
	 * Array of added experiences.
	 * @type {Array<{ expertise: string; years: number }>}
	 */
	export let addedExperiences: Array<{ expertise: string; years: number }> = [];

	/**
	 * Array of added availabilities.
	 * @type {Array<{ startDay: number; endDay: number }>}
	 */
	export let addedAvailability: Array<{ startDay: number; endDay: number }> = [];

	let valueSingle: string = '';
	let yearsOfExperience: number = 0;
	let startDay: string = '';
	let endDay: string = '';
</script>

<Stepper class="mx-auto w-2/3">
	<form action="post">
		<Step>
			<svelte:fragment slot="header">Area of Expertise</svelte:fragment>
			<ListBox>
				{#each expertise as exp}
					<ListBoxItem
						class="bg-primary-500"
						bind:group={valueSingle}
						name="expertise"
						value={exp.name}>{exp.name}</ListBoxItem
					>
				{/each}
			</ListBox>
			<div class="w-72">
				<label class="label">
					<span>Years of experience</span>

					<input bind:value={yearsOfExperience} class="input pl-2" type="text" placeholder="0" />
				</label>
				<br />
				<button
					class="select-none rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
					on:click={() => onAddExperience(valueSingle, yearsOfExperience)}
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
						<span class="">{experience.expertise}</span>
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
				</label>
				<br />
				<label class="label">
					<span>End Day</span>
					<input class="input pl-2" type="date" bind:value={endDay} />
				</label>
			</div>
			<button
				class="select-none rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
						<span class="">{availability.startDay}</span>
						<span class="flex-grow"></span>
						<span class="flex-grow"></span>
						<span class="font-semibold">To:</span>
						<span class="flex-shrink-0">{availability.endDay}</span>
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
							<span class="">{experience.expertise}</span>
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
							<span class="">{availability.startDay}</span>
							<span class="flex-grow"></span>
							<span class="flex-grow"></span>
							<span class="font-semibold">To:</span>
							<span class="flex-shrink-0">{availability.endDay}</span>
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

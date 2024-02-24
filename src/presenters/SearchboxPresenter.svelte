<script lang="ts">
	import type { CompetenceProfile } from '../models/CompetenceProfile';
	import { Person } from '../models/Person';
	import type { Competence } from '../models/Competence';
	import SearchboxView from '../views/SearchboxView.svelte';
	import { Utilities } from '$lib/util/utilites';

	export let competence_profiles: CompetenceProfile[];
	export let persons: Person[];
	export let competences: Competence[];
	export let updateTable: any;
	export let setApplicationBoolean: any;
	let list: string[] = [];
	let original_competence_profiles: CompetenceProfile[];

	/**
	 * Watches for changes in `competence_profiles` and initializes `original_competence_profiles` if it hasn't been set.
	 */
	$: {
		if (!original_competence_profiles && competence_profiles) {
			original_competence_profiles = competence_profiles.slice();
		}
	}

	/**
	 * Function triggered when a chip is added to the search box.
	 * @param event - The event object containing the chip value.
	 */
	function onAdd(event: any) {
		let possible_persons = persons.filter(
			(p) =>
				p.name.includes(Utilities.capitalizeFirstLetter(event.detail.chipValue)) ||
				p.surname.includes(Utilities.capitalizeFirstLetter(event.detail.chipValue))
		);

		let possible_persons_ids: number[] = possible_persons.map((person) => person.person_id);

		let possible_job = competences.filter((c) => c.name.includes(event.detail.chipValue));

		let possible_job_ids: number[] = possible_job.map((job) => job.competence_id);

		let possible_competence_profiles = competence_profiles.filter(
			(c) =>
				c.status.includes(event.detail.chipValue) ||
				possible_job_ids.includes(c.competence_id) ||
				possible_persons_ids.includes(c.person_id)
		);
		if (possible_competence_profiles.length > 0) {
			competence_profiles = possible_competence_profiles;
			updateTable(possible_competence_profiles);
			setApplicationBoolean(false);
		} else {
			let removeIndex = list.findIndex((chip) => chip === event.detail.chipValue);
			list.splice(removeIndex, 1);
		}
	}

	/**
	 * Function triggered when a chip is removed from the search box.
	 * Resets `competence_profiles` to the original state and updates the table.
	 * @param event - The event object containing the chip value.
	 */
	function onRemove(event: any) {
		competence_profiles = original_competence_profiles.slice();

		list.forEach((chip) => {
			var fakeEvent = {
				detail: {
					chipValue: chip
				}
			};
			onAdd(fakeEvent);
		});
		updateTable(competence_profiles);
		setApplicationBoolean(false);
	}
</script>

<SearchboxView {onAdd} {onRemove} {list}></SearchboxView>

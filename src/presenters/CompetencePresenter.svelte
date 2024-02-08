<script lang="ts">
	import { onMount } from 'svelte';
	import TableView from '../views/TableView.svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { Competence } from '../models/Competence';
	import { CompetenceProfile } from '../models/CompetenceProfile';
  
	let competences: Competence[] = [];
  
	onMount(async () => {
	  const res = await fetch('/api/competences');
	  const data = await res.json();
	  competences = data.competences.map((competenceData: { competence_profile: any[]; competence_id: number; name: string; }) => {
		const profiles = competenceData.competence_profile.map((profileData) => 
		  new CompetenceProfile(
			profileData.competence_profile_id,
			profileData.person_id,
			profileData.competence_id,
			profileData.years_of_experience
		  )
		);
		return new Competence(competenceData.competence_id, competenceData.name, profiles);
	  });
	});
  
	// Prepare table data
	$: transformedData = competences.flatMap(competence =>
    competence.competence_profile.map(profile => ({
      competenceName: competence.name,
      person_id: profile.person_id,
      competence_id: profile.competence_id,
      years_of_experience: profile.formatYearsOfExperience()
	  }))
	);
  
	$: bodyData = tableMapperValues(transformedData, [
	  'competenceName',
	  'person_id',
	  'competence_id',
	  'years_of_experience'
	]);
  </script>
  
  {#if competences.length > 0}
	<TableView 
	  head={['Competence Name', 'Person ID', 'Competence ID', 'Experience']} 
	  body={bodyData} 
	/>
  {/if}
  
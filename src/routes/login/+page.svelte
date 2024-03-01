<script lang="ts">
	import LoginPresenter from '../../presenters/LoginPresenter.svelte';

	// The 'data' prop contains the 'requestedPath' which is the originally requested path
	// This path is used by the LoginPresenter to redirect the user after a successful login
	export let data;
</script>

<LoginPresenter originallyRequestedPath={data.props.requestedPath} />

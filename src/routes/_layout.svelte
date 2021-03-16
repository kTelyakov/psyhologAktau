<script lang="ts">
	import MainHeader from "../components/MainHeader.svelte";

	export let segment: string;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		border: 1px solid greenyellow;
	}
</style>

<MainHeader/>

<main>
	<slot></slot>
</main>

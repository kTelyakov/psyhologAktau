<script lang="ts">
	import MainHeader from "../components/MainHeader.svelte"
	import Nav from '../components/Nav.svelte'

	// export let segment: string;
</script>


<div class="container">
	<MainHeader/>
	<Nav></Nav>
	<slot></slot>
</div>

<style lang="scss">
@import '../scss/index.scss';
</style>

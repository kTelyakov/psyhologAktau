<script lang="ts">
	import MainHeader from "../components/MainHeader.svelte";

	// export let segment: string;
</script>

<style lang="scss">
.container {
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	max-width: 1200px;
}
@media screen and (max-width: 1200px) {
	.container {
		background: red;
		width: 1170px;
	}
}
@media screen and (max-width: 992px) {
	.container {
		background: green;
		width: 970px;
	}
}
@media screen and (max-width: 768px) {
	.container {
		background: yellow;
		width: 750px;
	}
}

</style>

<div class="container">
	<MainHeader/>
</div>

<svelte:head>
	<title>Статьи</title>
</svelte:head>

<div class="blog">
	{#each posts as post}
		<Card cardObj={post}></Card>
	{/each}
</div>

<script>
import Card from 'components/Card.svelte'
import postsContent from './_posts'
let posts = postsContent.filter(post => post).map(({ title, img }) => {
	return {
		title,
		imgUrl: '/postImages/' + img
	}
})
</script>

<style>
	.blog {
		padding: 15px 0px;
		display: grid;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 15px;
		grid-row-gap: 15px;
	}
</style>

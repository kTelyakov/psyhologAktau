<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class="content">
  {@html post.content}
</div>


<script context="module" lang="ts">
  import posts from '../_posts'
  export async function preload(data) {
    const path = data.path.slice(1, data.path.length)
    const finded = posts.find(item => item.slug === path)
    console.log('@finded : ', finded)
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    // const slug = params.slug.replace('/blog/', '').replace(/\//g, '-').slice(0, -1)
    // console.log('@@SLUG : ', slug)
    return { post: finded }
  }
</script>

<script>
import Card from 'components/Card.svelte'
export let post = {}
</script>


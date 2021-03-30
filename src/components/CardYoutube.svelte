<script>
import Card from './Card.svelte'
import ModalYoutube from './ModalYoutube.svelte'

export let cardObj = {}
export let youtubeId = ''

let showModal = false

function clickHandler () {
  showModal = true
}
</script>

<Card cardObj={cardObj} youtubeCard={true} on:click={clickHandler}>
</Card>

<ModalYoutube bind:show={showModal} videoId={youtubeId} description={cardObj.title}></ModalYoutube>

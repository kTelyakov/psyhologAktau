<script>
import Heading from '../Heading.svelte'

const photos = [
  { url: 'photoReports/report1.jpeg' },
  { url: 'photoReports/report2.jpeg' },
  { url: 'photoReports/report3.jpeg' },
  { url: 'photoReports/report4.jpeg' },
  { url: 'photoReports/report5.jpeg' },
  { url: 'photoReports/report6.jpeg' },
  { url: 'photoReports/report7.jpeg' },
  { url: 'photoReports/report8.jpeg' },
]
</script>

<div class="photoReports">
  <div class="photoReports__title">
    <Heading size="l">
      Репортажы с мероприятий
    </Heading>
  </div>
  <div class="photoReports__content">
    {#each photos as photo}
      <img src="{photo.url}" alt="">
    {/each}
  </div>
</div>

<style lang="scss">
@import '../../scss/mixins.scss';
.photoReports {
  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  &__content {
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    @include mobile {
      grid-template-columns: 1fr;
    }
    @include tablet {
      grid-template-columns: 1fr 1fr 1fr;
    }
    & > img {
      width: 100%;
    }
  }
}
</style>

<template>
  <div>
    <Banner></Banner>
    <div class="container-fluid">
      <CardItem></CardItem>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import CardItem from '@/components/CardItem.vue'

export default {
  name: 'CategoryDetail',
  components: {
    Banner,
    CardItem
  }
}
</script>

<style lang="css" scoped></style>

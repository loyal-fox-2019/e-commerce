<template>
  <div>
    <Banner></Banner>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-lg-4 col-sm-12 mt-2">
          <CardItem></CardItem>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 mt-2">
          <CardItem></CardItem>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 mt-2">
          <CardItem></CardItem>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 mt-2">
          <CardItem></CardItem>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 mt-2">
          <CardItem></CardItem>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 mt-2">
          <CardItem></CardItem>
        </div>
      </div>
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

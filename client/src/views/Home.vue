<template>
  <div class="home">
    <Carousel></Carousel>
    <div class="row mt-4">
      <div class="col-md-12 text-center">
        <h2>Category</h2>
      </div>
    </div>
    <div class="container-fluid d-flex" style="justify-content: center;">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="item in category" :key="item">
          <Category :list="item"></Category>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 text-center">
        <h2>Items</h2>
      </div>
    </div>
    <div class="container-fluid">
      <CardItem></CardItem>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import CardItem from '@/components/CardItem.vue'
import Category from '@/components/CategoryList'

export default {
  name: 'home',
  data() {
    return {
      category: this.$store.state.categoryList
    }
  },
  components: {
    Carousel,
    CardItem,
    Category
  },
  created() {
    this.$store.dispatch('FETCH_ALL_ITEM')
  }
}
</script>

<style lang="css" scoped>
* {
  max-width: 100vw;
}
</style>

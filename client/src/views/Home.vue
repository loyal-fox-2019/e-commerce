<template>
  <div class="home">
    <b-row align-h="center" class="my-2">
    <CategoryCard v-for="(category, i) in $store.state.categories" :key="i" :categoryData="category"></CategoryCard>
    </b-row>
    <b-row align-h="center" class="my-5">
      <b-col>
       <h1>Our Newest Products</h1>
      </b-col>
    </b-row>
    <b-row class="my-5 mx-5 d-flex" align-h="center">
      <Carousel></Carousel>
  </b-row>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard'
import Carousel from '../components/Carousel'
export default {
  name: 'home',
  components: {
    CategoryCard,
    Carousel
  }
}
</script>

<style scoped>

</style>

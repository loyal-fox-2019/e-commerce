<template>
  <div>
    <b-row align-h="center" class="my-2">
     <CategoryCard v-for="(category, i) in $store.state.categories" :key="i" :categoryData="category"></CategoryCard>
    </b-row>
    <b-row align-h="center" class="my-5">
      <h1>{{$route.params.category}}</h1>
    </b-row>
    <router-view/>
    <b-row class="my-5 mx-5 d-flex" align-h="center">
      <ProductCard v-for="(product, i) in productCategory" :key="i" :productDisplay="product"></ProductCard>
  </b-row>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
export default {
  name: 'Category',
  components: {
    CategoryCard,
    ProductCard
  },
  computed: {
    productCategory () {
      return this.$store.state.allProducts.filter(element => element.category.toLowerCase() === this.$route.params.category)
    }
  }
}
</script>

<style scoped>

</style>

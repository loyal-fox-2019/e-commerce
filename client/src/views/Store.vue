<template>
  <section class="bg-white py-8">
    <div 
      class="container mx-auto flex justify-center items-center flex-wrap pt-4 pb-12">
      <ProductDisplay
        v-for="product in products"
        :key="product._id"
        :product="product">
      </ProductDisplay>
    </div>
  </section>
</template>

<script>
import axios from '../../config/axios'
import ProductDisplay from '../components/ProductDisplay'
export default {
  name: 'Store',
  components: {
    ProductDisplay
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
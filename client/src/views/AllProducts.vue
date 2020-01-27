<template>
  <div>
    <div class="p-4 flex flex-wrap items-center justify-center">
      <ProductCard v-for="(product, i) in products" :key="i" :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard'

export default {
  name: 'AllProducts',
  data() {
    return {

    }
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch('fetchProducts')
    }
  },
  created() {
    this.fetchProducts()
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  components: {
    ProductCard
  }
}
</script>

<style>

</style>
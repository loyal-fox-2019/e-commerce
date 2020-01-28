<template>
  <div class="home">
    <b-row>
      <ProductList class="col-md-4" v-for="product in products" :key="product._id" :product="product"/>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'home',
  components: {
    ProductList
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

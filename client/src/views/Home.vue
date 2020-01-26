<template>
  <div class="home">
    <div class="row justify-content-start">
      <CardProduct
        v-for="(productItem, i) in allProduct"
        :key="i"
        :detail="productItem"
      ></CardProduct>
    </div>
  </div>
</template>

<script>
import CardProduct from '../components/CardProduct'
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    CardProduct
  },
  computed: {
    allProduct() {
      return this.$store.state.listProduct
    }
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('fetchDataProduct')
  }
}
</script>

<style scoped>
.home {
  padding: 30px;
  min-height: 94vh;
}
</style>

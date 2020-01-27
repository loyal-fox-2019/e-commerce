<template>
  <v-row justify="center" class="d-flex flex-wrap">
    <product-item v-for="product in $store.state.products" :key="product._id" :product="product"/>
    <v-fab-transition>
      <v-btn
        color="pink"
        dark
        fixed
        top
        right
        fab
        id="upload-btn"
        @click="toUpload"
        v-if="$store.state.isLogin"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-row>
</template>

<script>
import ProductItem from '../components/ProductItem'
export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  methods: {
    toUpload () {
      this.$router.push('/upload')
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('fetchSale')
    } else {
      this.$store.dispatch('fetchProducts')
    }
  }
}
</script>

<style lang="scss" scoped>
#upload-btn {
  top: 85vh;
  right: 7vw;
}
</style>

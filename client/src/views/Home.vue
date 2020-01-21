<template>
  <div>
    <NavBar></NavBar>
    <!-- <Carousel></Carousel> -->
    <div class="row px-4 mt-3 mb-4">
      <ProductList v-for="product in products" :item="product" :key="product._id" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Carousel from '../components/Carousel'
import ProductList from '../components/ProductList'
import NavBar from '../components/NavBar'
import axios from 'axios'

export default {
  name: 'home',
  data(){
    return {
      products: []
    }
  },
  components: {
    ProductList,
    NavBar
    // Carousel
  },
  created(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/products'
    })
    .then(({data})=>{
      this.products = data
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
</style>
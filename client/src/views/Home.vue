<template>
  <div>
    <NavBar @nowLoading="loading" @productAdded="addProduct"></NavBar>
      <div class="container-fluid p-0 m-0">
        <div class="loader" v-if="isLoading">
          <div class="text-center mb-3 d-flex justify-content-between">
          <b-spinner
            variant='primary'
          ></b-spinner>
        </div>
      </div>
      <Carousel></Carousel>
      <div class="d-flex mx-auto overflow-hidden">
        <!-- <div class="row mt-2 justify-content-center">
          <input type="text" id="search-bar" placeholder="Search Product">
          <i class="fas fa-search fa-lg" id="search-img"></i>
        </div> -->
        <div class="row mx-2">
          <ProductList v-for="product in products" :item="product" :key="product._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel'
import ProductList from '../components/ProductList'
import NavBar from '../components/NavBar'
import axios from 'axios'

export default {
  name: 'home',
  data(){
    return {
      products: [],
      isLoading: false
    }
  },
  methods: {
    addProduct: function(payload){
      this.products.push(payload)
      this.isLoading = false
    },
    loading: function(){
      this.isLoading = true
    }
  },
  components: {
    ProductList,
    NavBar,
    Carousel
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
.loader {
    position: fixed;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
}
</style>
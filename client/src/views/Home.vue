<template>
  <div>
    <NavBar @nowLoading="loading" @productAdded="fetchProducts"></NavBar>
      <div class="container-fluid p-0 m-0">
        <div class="loader" v-if="isLoading">
          <div class="text-center mb-3 d-flex justify-content-between">
          <b-spinner
            variant='primary'
          ></b-spinner>
          </div>
        </div>
      <Carousel></Carousel>
      <div class="row search-row mt-2 justify-content-center">
        <input type="text" id="search-bar" placeholder="Search Product" v-model="searchBox" @keyup="filter">
        <i class="fas fa-search fa-lg mt-2 ml-2" id="search-img"></i>
      </div>
      <div class="d-flex mx-auto overflow-hidden">
        <div class="row mx-2 w-100">
          <ProductList v-for="product in products" :item="product" :key="product._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel'
import ProductList from '../components/ProductList'
import NavBar from '../components/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  data(){
    return {
      searchBox: '',
      products: [],
      products_perma: [],
      isLoading: false
    }
  },
  methods: {
    fetchProducts: function(){
      axios({
        method: 'get',
        url: 'http://ecommerce-server.kennys.my.id:3000/products'
      })
      .then(({data})=>{
        this.products = data
        this.products_perma = data
        this.isLoading = false
        this.searchBox = ''
      })
      .catch(()=>{
        Swal.fire({
            icon: 'error',
            title: 'Error'
        })
      })
    },
    loading: function(){
      this.isLoading = true
    },
    filter: function(){
      let temp = []
      for(let obj of this.products_perma) {
        if(obj.name.toLowerCase().includes(this.searchBox.toLowerCase())) {
          temp.push(obj)
        }
      }
      this.products = temp
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
      url: 'http://ecommerce-server.kennys.my.id:3000/products'
    })
    .then(({data})=>{
      this.products = data
      this.products_perma = data
      this.searchBox = ''
      this.isLoading = false
    })
    .catch(()=>{
      Swal.fire({
          icon: 'error',
          title: 'Error'
      })
    })
  }
}
</script>

<style scoped>
.search-row {
  width: 100%;
}
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
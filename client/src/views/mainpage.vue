<template>
  <div>
    <navbar :datas="productlist" v-on:searched-prod="computeProductList($event)"></navbar>
    <carousell></carousell>
    <div><h1>All Products </h1></div>
    <div class="container d-block mx-auto">
      <div class="row">
        <productlist v-for="product in productlist" :key="product.id" :data="product" class="col-sm-4"></productlist>
      </div>
    </div>
  </div>
</template>


<script>
import carousell from '../components/carousell'
import axios from 'axios'
import navbar from '../components/navbar'
import productlist from '../components/productlist'
export default {
  name: 'mainpage',
  components: {
    productlist,
    navbar,
    carousell
  },
  data(){
    return{
      productlist: null,
    }
  },
  methods:{
    computeProductList(val){
      this.productlist = val
    }
  },
  watch:{
    $route: function(){
      axios({
      method: 'get',
      url: 'http://35.240.228.104:3000/product',
      headers:{
        token: localStorage.getItem('token')
      }
    })
    .then(({data})=>{
      this.productlist = data
    })
    .catch(err=>{
      console.log(err)
    })
    }
  },
  created(){
    //ambil semua product lwt axios
    console.log('get all products')
    axios({
      method: 'get',
      url: 'http://35.240.228.104:3000/product',
      headers:{
        token: localStorage.getItem('token')
      }
    })
    .then(({data})=>{
      this.productlist = data
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>
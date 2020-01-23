<template>
  <div>
      <navbar></navbar>
      <addnewproduct v-on:created-product="addNewProduct($event)"></addnewproduct>
      <div class="row justify-content-center">
          <productlist class="col-sm-4" v-for="item in userProducts" :key="item._id" :data="item"></productlist>
      </div>
      
  </div>
</template>

<script>
import productlist from '../components/productlist'
import navbar from '../components/navbar'
import addnewproduct from '../components/addnewproduct.vue'
import axios from 'axios'
export default {
    name: 'myproducts',
    components:{
        navbar,
        productlist,
        addnewproduct
    },
    methods:{
        addNewProduct(prod){
            this.userProducts.push(prod)
        }
    },
    data(){
        return{
            userProducts: []
        }
    },
    created(){
        axios({
            method: 'get',
            url: 'http://localhost:3000/product/user',
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            console.log(data, 'di my products')
            this.userProducts = data
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style>

</style>
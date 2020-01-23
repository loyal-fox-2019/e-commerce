<template>
  <div>
      <navbar></navbar>
      <productlist></productlist>
  </div>
</template>

<script>
import productlist from '../components/productlist'
import navbar from '../components/navbar'
import axios from 'axios'
export default {
    name: 'myproducts',
    components:{
        navbar,
        productlist
    },
    data(){
        return{
            userProducts: []
        }
    },
    created(){
        axios({
            method: 'get',
            url: 'http://localhost:3000/product/user'
        })
        .then(({data})=>{
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
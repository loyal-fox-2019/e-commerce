<template>
  <div>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1>
              <i class="fa fa-shopping-cart"></i>
              Your cart
              </h1>
              <div class="row">
                <card v-for="(product,i) in products" :key="i" :where="'cart'" :product="product" @deleteCart="getUserData" class='m-3'></card>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Card from "../components/Card"
import axios from 'axios'

export default {
  name : 'cartView',
  components : {
    Card  
  },
  data(){
    return{
      products : []
    }
  },
  methods : {
    getUserData(){
      axios.post('http://localhost:3000/user/one', {user  : localStorage.user})
      .then(({data})=>{
        this.products = data.cart
      })
      .catch(err =>{
        console.log(err)
      })
    }
  },
  created(){
    this.getUserData()
  }
}
</script>

<style>

</style>
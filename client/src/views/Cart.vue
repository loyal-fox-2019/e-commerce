<template>
  <div>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1>
              <i class="fa fa-shopping-cart"></i>
              Your cart
              </h1>
              <button @click="checkout" class="btn btn-dark">Checkout</button>
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
    checkout(){
      if(this.products.length === 0){
        swal.fire('Your cart is empty? :/ shop away young padawan!')
        return
      }
      axios({
        url : 'http://localhost:3000/transaction',
        method : 'post',
        headers : {
          token : localStorage.token
        },
        data:{
          buyer : localStorage.user,
          products : this.products,
        }
      })
      .then(({data}) => {
        console.log(data)
        axios.put(`http://localhost:3000/user/emptycart/${localStorage.user}`)
        .then(({data})=>{
          swal.fire('Thankyou for shopping with us =)')
          this.getUserData()
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
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

<style scoped>

</style>
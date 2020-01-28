<template>
  <div>
      <NavBar @nowLoading="loading" @productAdded="fetchProducts"></NavBar>
      <div class="loader" v-if="isLoading">
          <div class="text-center mb-3 d-flex justify-content-between">
            <b-spinner
                variant='primary'
            ></b-spinner>
          </div>
      </div>
      <b-container fluid class="mt-4" id="container">
          <b-row class="pt-2 pb-2 px-3" id="header">
              <b-col cols="8">
                  <h4>Total Price: {{finalTotal}}</h4>
              </b-col>
              <b-col cols="4" >
                  <b-button v-if="cart[0] !== undefined" @click="checkout" class="float-right" size="md" variant="outline-success" id="checkout">Checkout <i class="fas fa-lg fa-shopping-basket"></i></b-button>
              </b-col>
          </b-row>
          <b-row v-if="cart[0] == undefined" class="mt-5" align-h="center">
              <h4>Cart is empty</h4>
          </b-row>
          <b-row id="cart-content" class="flex" v-if="cart[0] !== undefined">
            <CartDetail @doneEdit="fetchCart" v-for="item in cart" :key="item._id" :detail="item"></CartDetail>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import CartDetail from '../components/CartDetail'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "cart",
    data(){
        return {
            cart: [],
            isLoading: false
        }
    },
    methods: {
        fetchProducts: function(){
            this.$router.push('/')
        },
        loading: function(){
            this.isLoading = true
        },
        fetchCart: function(){
            axios({
                method: 'get',
                url: "http://ecommerce-server.kennys.my.id:3000/users",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.cart = data.cart
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error'
                })
            })
        },
        checkout: function(){
            axios({
                method: 'patch',
                url: "http://ecommerce-server.kennys.my.id:3000/users/checkout",
                data: {
                    cart: this.cart
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.$router.push('/')
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    text: `Total purchase ${this.finalTotal}`
                })
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.message
                })
            })
        }
    },
    computed: {
        finalTotal: function(){
            let angka = 0
            for(let obj of this.cart) {
                angka += (obj.quantity * obj.item.price)
            }
            let rupiah = '';		
            let numReverse = angka.toString().split('').reverse().join('');
            for(let i = 0; i < numReverse.length; i++) if(i%3 == 0) rupiah += numReverse.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }
    },
    components: {
        NavBar,
        CartDetail
    },
    created(){
        axios({
            method: 'get',
            url: "http://ecommerce-server.kennys.my.id:3000/users",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            this.cart = data.cart
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
h4{
    margin-top: 4px
}

#cart-content {
    height: 70vh;
    overflow: auto;
}

#container {
    height: 80vh;
    width: 50vw;
    min-width: 450px;
    border-radius: 8px;
    background-color: rgb(226, 226, 226);
}

#header {
    border-bottom: 2px solid rgb(90, 182, 90)
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
.fa-shopping-basket {
    color: rgb(90, 182, 90)
}
</style>
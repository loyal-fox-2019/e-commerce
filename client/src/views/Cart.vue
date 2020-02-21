<template>
   <div class="flex justify-center pt-10">
      <div class="bg-clouds flex flex-col w-8/12 rounded-lg cart-base overflow-hidden pt-4 px-6">
         <CartItemCard v-for="cartItem in cart" :key="cartItem._id" :item="cartItem.item" :quantity="cartItem.quantity" @refresh="fetchUser"/>

         <div class="pb-4 font-semibold text-gray-700 flex flex-col items-start justify-center">
            <p class="mb-1">Total <span>{{subtotal}}</span></p>
            <div class="bg-gray-500 text-clouds rounded-lg flex items-center overflow-hidden text-xl">
               <span class="inline-block px-2">Checkout</span>
               <div class="h-full pl-3 cursor-pointer hover:bg-blue-600 p-2 flex items-center" @click="checkout">
                  <i class="fas fa-cash-register py-2 mr-2"></i>
               </div>
            </div>
         </div>

         <div v-if="outOfStock.length > 0" class="bg-red-200 text-gray-700 mb-4 p-6 rounded-lg">
            <p class="font-semibold text-lg">Out of stock items:</p>
            <ul class="mb-4">
               <li v-for="item in outOfStock" :key="item.itemName">
                  {{item.itemName}}
               </li>
            </ul>
            <button @click="closeError" class="font-semibold text-lg bg-yellow-200 rounded-lg py-1 px-2">Close</button>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../services/server'
import CartItemCard from '../components/CartItemCard'

export default {
   name: 'Cart',
   components: {
      CartItemCard
   },

   data() {
      return {
         cart: [],
         subtotal: 0,
         outOfStock: []
      }
   },

   methods: {
      async fetchUser() {
         try {
            const {data} = await axios.get(`/user`, {
               headers: {
                  token: localStorage.token
               }
            })

            this.cart = data.user.cart
            this.subtotal = 0

            this.cart.forEach((cartItem) => {
               this.subtotal += cartItem.item.price * cartItem.quantity
            })
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      },

      async checkout() {
         try {
            const {data} = await axios.post('/transaction', {
               headers: {
                  token: localStorage.token
               }
            })

            Swal.fire({
               text: 'Checkout success'
            })

            this.$router.push({name: 'transaction'})
         }
         catch (error) {
            this.outOfStock = error.response.data.outOfStock
         }
      },

      closeError() {
         this.outOfStock = []
      }
   },

   created() {
      this.fetchUser()
   }
}
</script>

<style scoped>
   .cart-base {
      height: fit-content;
   }
</style>
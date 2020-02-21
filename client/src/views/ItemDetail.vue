<template>
   <div class="flex justify-center py-10">
      <div class="flex flex-col bg-clouds w-10/12 rounded-lg">
         <div class="overflow-hidden rounded-t-lg">
            <img :src="item.image" class="object-cover rounded-t-lg detail-img">
         </div>
         
         <div class="flex flex-col px-8 py-4">
            <div class="mb-3 text-2xl text-gray-700 flex flex-col">
               <h4 class="text-gray-700 font-semibold mb-2">{{item.name}}</h4>
               <div class="flex items-center">
                  <i class="fas fa-box-open"></i>
                  <span class="ml-2 text-lg text-gray-600">{{item.stock}}</span>
                  <div class="rounded-lg border border-gray-500 ml-6 flex items-center overflow-hidden">
                     <input type="text" v-model="quantity" class="text-right outline-none quantity-input bg-clouds text-lg text-gray-600">
                     <div class="ml-2 px-3 bg-gray-500 hover:bg-blue-700 text-clouds cursor-pointer" @click="addToCart">
                        <i class="fas fa-cart-plus"></i>
                     </div>
                  </div>
               </div>
            </div>
            <div v-html="item.description" class="text-gray-600 leading-normal"></div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'ItemDetail',

   data() {
      return {
         item: {},
         quantity: 1
      }
   },

   methods: {
      async fetchOneItem() {
         try {
            const {data} = await axios.get(`/item/${this.$route.params.id}`)
            this.item = data.item
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      },

      async addToCart() {
         try {
            if(isNaN(this.quantity)) {
               Swal.fire({
                  text: 'Quantity must be a number'
               })
            }
            else {
               const {data} = await axios.patch(`/user/add_to_cart`,
                  {
                     itemId: this.item._id,
                     quantity: this.quantity
                  },
                  {
                     headers: {
                        token: localStorage.token
                     }
                  }
               )

               Swal.fire({
                  text: 'Add to/modify cart success'
               })
            }
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      }
   },

   created() {
      this.fetchOneItem()
   }
}
</script>

<style scoped>
   .detail-img {
      width: 100%;
      max-height: 33rem;
   }

   .quantity-input {
      width: 4rem;
   }
</style>
<template>
   <div class="bg-red-100 border mb-4 border-gray-700 rounded-lg overflow-hidden">
      <div class="pr-4 h-32 flex bg-clouds">
         <img :src="currentItem.image" class="object-cover forimg">
         <div class="px-4 flex flex-col">
            <h4 class="font-semibold text-gray-700 mb-2">{{currentItem.name}}</h4>
            <p class="text-sm font-light text-gray-600 mb-2">Submitting quantity with value 0 will delete the item from cart.</p>

            <div class="flex edit flex items-center rounded-lg">
               <input type="text" v-model="currentQuantity" class="text-right outline-none quantity-input bg-clouds text-lg text-gray-600">
               <div class="bg-gray-500 hover:bg-blue-700 cursor-pointer ml-2 px-3 rounded-r-lg" @click="addToCart">
                  <i class="far fa-edit"></i>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'CartItemCart',

   data() {
      return {
         currentQuantity: this.quantity,
         currentItem: this.item
      }
   },

   props: {
      item: {
         type: Object
      },

      quantity: {
         type: Number
      }
   },

   methods: {
      async addToCart() {
         try {
            if(isNaN(this.currentQuantity)) {
               Swal.fire({
                  text: 'Quantity must be a number'
               })
            }
            else {
               if(this.currentQuantity > 0) {
                  const {data} = await axios.patch(`/user/add_to_cart`,
                     {
                        itemId: this.currentItem._id,
                        quantity: this.currentQuantity
                     },
                     {
                        headers: {
                           token: localStorage.token
                        }
                     }
                  )
      
                  Swal.fire({
                     text: 'Modify/delete item from cart success'
                  })
               }
               else {
                  const {data} = await axios.patch(`/user/remove_from_cart`,
                     {
                        itemId: this.currentItem._id
                     },
                     {
                        headers: {
                           token: localStorage.token
                        }
                     }
                  )
               }

               this.$emit('refresh')
            }
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      }
   }
}
</script>

<style scoped>
   .edit {
      max-width: 5rem;
      height: 2rem;
   }

   .forimg {
      width: 10rem;
   }

   .custom-h {
      height: 10rem;
   }

   .quantity-input {
      width: 4rem;
      height: 100%;
   }
</style>
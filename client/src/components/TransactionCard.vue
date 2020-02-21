<template>
   <div class="mb-4 border-b border-gray-700 pb-4">
      <p class="text-lg font-semibold text-gray-700">Transaction date: <span class="text-gray-500">{{transaction.createdAt.split('T')[0]}}</span></p>
      <p class="text-lg font-semibold text-gray-700">Transaction items:</p>
      <ul>
         <li class="text-gray-600" v-for="purchasedItem in transaction.purchasedItems" :key="purchasedItem.item._id">
            <p>Item name: {{purchasedItem.item.name}}</p>
            <p>Quantity: {{purchasedItem.quantity}}</p>
         </li>
      </ul>
      
      <div v-if="transaction.status == 'on_delivery'">
         <p>Please click the link below if you have received the items you have purchased from this transactions.</p>
         <a href="" class="underline text-blue-700" @click.prevent="changeStatusToDelivered">Item delivered</a>
      </div>
      <div v-else>
         <p class="text-gray-700 text-xl font-semibold">Item delivered, thank you for your purchase.</p>
      </div>
   </div>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'TransactionCard',

   props: {
      transaction: {
         type: Object
      }
   },

   methods: {
      async changeStatusToDelivered() {
         try {
            const {data} = await axios.patch(`/transaction/${this.transaction._id}`,
               {
                  status: 'delivered'
               },
               {
                  headers: {
                     token: localStorage.token
                  }
               }
            )

            Swal.fire({
               text: 'Update transaction status success'
            })

            this.$emit('refresh')
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

<style>

</style>
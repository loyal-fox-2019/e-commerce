<template>
   <div class="flex justify-center py-10">
      <div class="flex flex-col w-8/12 bg-clouds px-4 py-4">
         <div class="" v-for="transaction in transactions" :key="transaction._id">
            <div class="mb-4 border-b border-gray-700 pb-4">
               <p class="text-lg font-semibold text-gray-700">Transaction Id: <span class="text-gray-600">{{transaction._id}}</span></p>
               <p class="text-lg font-semibold text-gray-700">User: <span class="text-gray-600">{{transaction.user.email}}</span></p>
               <p class="text-lg font-semibold text-gray-700">Transaction date: <span class="text-gray-600">{{transaction.createdAt.split('T')[0]}}</span></p>
               <p class="text-lg font-semibold text-gray-700">Transaction items:</p>
               <ul>
                  <li class="text-gray-600" v-for="purchasedItem in transaction.purchasedItems" :key="purchasedItem.item._id">
                     <p>Item name: {{purchasedItem.item.name}}</p>
                     <p>Quantity: {{purchasedItem.quantity}}</p>
                  </li>
               </ul>
               
               <div v-if="transaction.status == 'on_delivery'">
                  <p class="text-gray-700 text-xl font-semibold">On delivery</p>
               </div>
               <div v-else>
                  <p class="text-gray-700 text-xl font-semibold">Item delivered</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'Admin',

   data() {
      return {
         transactions: []
      }
   },

   methods: {
      async fetchTransactions() {
         try {
            const {data} = await axios.get('/transaction', {
               headers: {
                  token: localStorage.token
               }
            })

            this.transactions = data.transactions
            console.log(data.transactions)
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      }
   },

   created() {
      this.fetchTransactions()
   }
}
</script>

<style scoped>

</style>
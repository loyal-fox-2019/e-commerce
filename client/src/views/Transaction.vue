<template>
   <div class="flex justify-center pt-10">
      <div class="bg-clouds flex flex-col w-8/12 rounded-lg cart-base overflow-hidden py-4 px-6 transactionpage">
         <TransactionCard v-for="transaction in transactions" :key="transaction._id" :transaction="transaction" @refresh="fetchUser"/>
      </div>
   </div>
</template>

<script>
import axios from '../services/server'
import TransactionCard from '../components/TransactionCard'

export default {
   name: 'Transaction',

   data() {
      return {
         transactions: []
      }
   },

   components: {
      TransactionCard
   },

   methods: {
      async fetchUser() {
         console.log('fetching')
         try {
            const {data} = await axios.get('/transaction/user_transactions', {
               headers: {
                  token: localStorage.token
               }
            })

            this.transactions = data.transactions
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.messsage
            })
         }
      }
   },

   created() {
      this.fetchUser()
   }
}
</script>

<style scoped>
   .transactionpage {
      height: fit-content;
   }
</style>
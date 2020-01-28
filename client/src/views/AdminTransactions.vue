<template>
  <div class="container mx-auto flex flex-col">
    <div class="container mx-auto border py-4 rounded flex flex-col mt-2">
      <div class="flex justify-between items-center px-4">
        <div class="w-1/2 text-center font-bold">Transaction ID</div>
        <div class="w-1/2 text-center font-bold">Status </div>
      </div>
      <AdminTransactionItem
        v-for="transaction in allTransactions"
        :key="transaction._id"
        :transaction="transaction">
      </AdminTransactionItem>
    </div>
  </div>
</template>

<script>
import AdminTransactionItem from '../components/AdminTransactionItem'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Transaction',
  components: {
    AdminTransactionItem
  },
  methods: {
    ...mapActions(['fetchAllTransactions'])
  },
  computed: {
    ...mapState(['allTransactions'])
  },
  created () {
    this.fetchAllTransactions()
  }
}
</script>

<style>

</style>
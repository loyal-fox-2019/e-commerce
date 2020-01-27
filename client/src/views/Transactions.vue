<template>
  <div class="container mx-auto flex flex-col">
    <div class="container mx-auto mt-20 w-3/5 border py-4 rounded flex flex-col">
      <div class="flex justify-between items-center px-4">
        <div class="w-1/3 text-center text-lg font-bold">Transaction ID</div>
        <div class="w-1/3 text-center text-lg font-bold">Status </div>
        <div class="w-1/3 text-center"></div>
      </div>
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction._id"
        :transaction="transaction">
      </TransactionItem>
    </div>
  </div>
</template>

<script>
import TransactionItem from '../components/TransactionItem'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Transaction',
  components: {
    TransactionItem
  },
  methods: {
    ...mapActions(['fetchMyTransactions'])
  },
  computed: {
    ...mapState(['transactions'])
  },
  created () {
    this.fetchMyTransactions()
  }
}
</script>

<style>

</style>
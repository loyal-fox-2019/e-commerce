<template>
  <div class="container mx-auto w-3/5 border py-4 rounded flex flex-col">
    <div class="flex justify-between items-center px-4">
      <div class="w-1/3 text-center text-lg font-bold">Transaction ID</div>
      <div class="w-1/3 text-center text-lg font-bold">Status </div>
      <div class="w-1/3 text-center"></div>
    </div>
    <TransactionItem></TransactionItem>
    
  </div>
</template>

<script>
import TransactionItem from '../components/TransactionItem'
export default {
  name: 'Transaction',
  components: {
    TransactionItem
  }
}
</script>

<style>

</style>
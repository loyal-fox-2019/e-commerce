<template>
  <div class="containter w-full mx-auto p-2">
    <div class="border border-gray-300 shadow-md rounded p-2 mb-2">
      <div class="flex flex-col md:flex-row justify-between items-center px-4">
        <div
          @click.prevent="openDetails = !openDetails"
          class="md:w-1/2 text-sm text-center underline cursor-pointer">
          {{ transaction._id }}
        </div>
        <div class="md:w-1/2 text-sm text-center">{{ statusMsg }}</div>
      </div>
      <div v-if="openDetails" class="px-4">
        <div>Items: </div>
        <ul class="px-4">
          <li 
            v-for="item in transaction.cart"
            :key="item._id" 
            class="text-sm">
            {{item.productId.name}} {{item.amount}}x (@ Rp. {{item.productId.price}})
          </li>
        </ul>
        <div class="text-sm py-2">Shipping Fee: Rp. {{ transaction.shippingFee }}</div>
        <div class="text-sm py-2">Total: Rp. {{ transaction.totalPrice + transaction.shippingFee }}</div>
        <div class="text-sm py-2">Name: {{ transaction.name }}</div>
        <div class="text-sm py-2">Address: {{ transaction.address }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TransactionItem',
  props: ['transaction'],
  data () {
    return {
      openDetails: false
    }
  },
  computed: {
    statusMsg () {
      let status = this.transaction.status
      if (status === 'waiting') {
        return 'Waiting for payment'
      } else if (status === 'paid') {
        return 'On Process'
      } else if (status === 'delivered') {
        return 'Delivered'
      }
    }
  }
}
</script>

<style>

</style>
<template>
  <div class="containter w-full mx-auto p-2">
    <div class="border border-gray-300 shadow-md rounded p-2 mb-2">
      <div class="flex flex-col md:flex-row justify-between items-center px-4">
        <div
          @click.prevent="openDetails = !openDetails"
          class="md:w-1/3 text-sm text-center underline cursor-pointer">
          {{ transaction._id }}
        </div>
        <div class="md:w-1/3 text-sm text-center">{{ statusMsg }}</div>
        <div class="md:w-1/3 text-sm text-center">
          <button
            v-if="transaction.status === 'waiting'"
            @click.prevent="changeTransactionStatus('paid', transaction._id)"
            type="button"
            class="border mx-auto block border-gray-700 py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600">
            I have completed payment
          </button>
          <button
            v-if="transaction.status === 'paid'"
            @click.prevent="changeTransactionStatus('delivered', transaction._id)"
            type="button"
            class="border mx-auto block border-gray-700 py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600">
            Delivered
          </button>
        </div>
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
  methods: {
    changeTransactionStatus(status, transactionId) {
      const payload = {
        status,
        transactionId
      }
      this.$store.dispatch('changeTransactionStatus', payload)
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
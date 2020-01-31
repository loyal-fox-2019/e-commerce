<template>
  <div class="h-screen w-screen vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div class="h-auto px-5 pt-20 pb-5">
      <div class="h-full">
        <div>
          <h1
            class="text-6xl font-hairline tracking-wider text-red-900 capitalize"
          >
            Cart List
          </h1>
          <router-link
            to="/transaction"
            class="border border-red-900 text-red-900 py-1 px-2 text-sm font-hairline hover:bg-red-900 hover:text-white rounded-sm"
            >Transaction</router-link
          >
          <hr class="my-2" />
        </div>
      </div>
    </div>
    <div class="pl-5 flex">
      <div class="w-2/3 custom-height overflow-y-scroll">
        <h1 class="text-5xl" v-if="cart.items.length === 0">
          There is no item right now
        </h1>
        <CartCard
          v-else
          v-for="item in cart.items"
          :key="item._id"
          :item="item.item"
          :quantity="item.quantity"
        />
      </div>
      <div class="w-1/3 ml-10">
        <h1 class="text-3xl">Checkout all item for</h1>
        <Money
          v-model="totalPrice"
          v-bind="money"
          class="text-red-500 text-4xl font-bold"
        />
        <button
          class="block bg-red-900 hover:bg-red-800 px-4 py-2 rounded-sm text-white mt-5"
          v-if="!confirmation"
          @click="confirmation = true"
          :disabled="cart.items.length == 0"
        >
          Checkout
        </button>
        <div v-else>
          <p class="text-2xl font-medium tracking-wide">Are you sure?</p>
          <button
            class="bg-teal-900 hover:bg-teal-800 px-4 py-2 rounded-sm text-white mr-2"
            @click="confirmation = false"
          >
            Cancel
          </button>
          <button
            class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-sm text-white"
            @click="checkout"
          >
            Pay it
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import { Money } from 'v-money'
import CartCard from '@/components/CartCard.vue'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'cart',
  components: { CartCard, Loading, Money },
  data: function() {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$',
        precision: 2,
        masked: false,
      },
      confirmation: false,
    }
  },
  created() {
    this.$store.dispatch('fetch_user_cart')
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    cart() {
      return this.$store.state.cart
    },
    totalPrice() {
      return this.cart.items.reduce((a, item) => {
        let total = Number(item.item.price) * item.quantity
        return (a += total)
      }, 0)
    },
  },
  methods: {
    checkout() {
      const vm = this
      this.$store.dispatch('create_transaction', { vm })
    },
  },
}
</script>

<style scoped>
.custom-height {
  height: 46rem !important;
}
</style>

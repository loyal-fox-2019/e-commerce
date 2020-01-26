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
        <button>Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import CartCard from '@/components/CartCard.vue'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'cart',
  components: { CartCard, Loading },
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
  },
}
</script>

<style scoped>
.custom-height {
  height: 46rem !important;
}
</style>

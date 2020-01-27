<template>
  <div class="p-4 flex flex-col">
    <span class="bold mb-2">{{ product.name }}</span>
    <div class="flex flex-col justify-between">
      <div class="flex justify-between">
        <span class="text-sm font-bold">Rp. {{ product.price }}</span>
        <span class="text-sm">Stock: {{ product.stock }} </span>
      </div>
      <div class="py-2">
        <form 
          @submit.prevent="addToCart(product._id)"
          class="flex flex-col justify-between">
          <div v-if="isLoggedIn" class="flex justify-between">
            <label class="text-sm">
              Quantity: 
            </label>
            <input
              class="w-1/2 border border-gray-800 rounded mb-1 px-1"
              type="number" 
              v-model="amount"
              min="1" 
              :max="product.stock">
            </div>
            <div v-if="isLoggedIn">
              <button
                type="submit"
                class="w-full text-sm h-6 text-gray-700 px-2 border border-gray-800 rounded align-middle">
                Add to Cart
              </button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ActionBox',
  props: ['product'],
  data () {
    return {
      amount: 1
    }
  },
  methods: {
    addToCart (productId) {
      let payload = {
        productId,
        amount: Number(this.amount)
      }
      this.$store.dispatch('addToCart', payload)
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  }
}
</script>

<style>

</style>
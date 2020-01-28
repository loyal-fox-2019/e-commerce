<template>
  <div class="containter w-full mx-auto">
    <div class="border border-gray-300 shadow-md rounded flex p-4 mb-2">
      <router-link to="/store" class="flex justify-center shadow-md rounded">
        <img
          class=" hover:grow hover:shadow-lg w-24 h-24"
          :src="product.productId.image" >
      </router-link>
      <div class="flex flex-col justify-between px-4">
        <span class="text-sm">{{ product.productId.name }}</span>
        <span class="text-sm">Rp. {{ product.productId.price }}</span>
        <form>
          <label>
            Amount:
          </label>
          <input
            v-model="amount"
            type="number"
            class="border px-2 w-20 rounded border-gray-300">
        </form>
      </div>
      <div class="flex ml-auto items-end">
        <img 
          @click.prevent="deleteCart"
          class="cursor-pointer"
          src="https://img.icons8.com/android/24/000000/trash.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['product'],
  data () {
    return {
      amount: this.product.amount
    }
  },
  methods: {
    deleteCart () {
      const payload = {
        amount: this.amount,
        productId: this.product.productId._id
      }
      this.$store.dispatch('removeItemFromCart', payload)
    }
  },
  created () {
  },
  watch: {
    amount (n, o) {
      const payload = {
        amount: n,
        productId: this.product.productId._id
      }
      this.$store.dispatch('updateAmount', payload)
    }
  }
}
</script>

<style>

</style>
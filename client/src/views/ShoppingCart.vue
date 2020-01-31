<template>
  <div class="flex mb-4">

    <div v-if="cart.length == 0">
      <div class="w-1/2 h-12 m-6">
        <CartCard v-for="(item, i) in cart" :key="i" :item="item" />
      </div>
      <h1>Your cart is empty</h1>
    </div>

    <div v-if="cart.length >= 1" class="w-1/2 h-12 m-6">
      <CartCard v-for="(item, i) in cart" :key="i" :item="item" />
    </div>

    <div v-if="cart.length >= 1" class="w-1/2 h-12 m-6">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
          Address
        </label>
        <input v-model="address" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Jl. Bumi no. 17, Kebayoran Lama, Jakarta Selatan">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="courier">
          Courier
        </label>
        <input v-model="courier" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="JNE">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fee">
          Delivery Fee
        </label>
        <input v-model="delivery_fee" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="15000" min="9000">
      </div>
      <div class="flex items-center justify-between">
        <button @click="createTransaction" class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Pay
        </button>
      </div>
    </form>
    </div>

  </div>
</template>

<script>
import CartCard from '../components/CartCard'

export default {
  name: 'ShoppingCart',
  data() {
    return {
      address: '',
      courier: '',
      delivery_fee: '',
      cart: []
    }
  },
  methods: {
    createTransaction() {
      this.$axios({
        method: 'POST',
        url: 'transactions',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          address: this.address,
          courier: this.courier,
          delivery_fee: this.delivery_fee
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$swal.fire({
            title: 'Success!',
            text: 'Transaction success!',
            icon: 'success',
            confirmButtonText: 'Close'
          })
          this.$router.push('/dashboard')
        })
        .catch(err => {
          this.$swal.fire({
            title: 'Error!',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
        .finally(() => {
          this.address = ''
          this.courier = ''
          this.delivery_fee = ''
        })
    }
  },
  mounted() {
    this.$axios({
      method: 'GET',
      url: 'cart',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        console.log(data)
        this.cart = data
      })
      .catch(err => {
        this.$swal.fire({
          title: 'Error!',
          text: err.response.data.error,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      })
  },
  components: {
    CartCard
  }
}
</script>

<style>

</style>
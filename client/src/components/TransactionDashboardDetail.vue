<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
  <p class="text-left mb-6">ID: {{ transaction._id }}<br>
    Buyer: {{ transaction.buyer.email }}<br>
    Address: {{ transaction.address }}<br>
    Status: {{ transaction.status }}<br>
    Courier: {{ transaction.courier }}<br>
    Delivery Fee: {{ transaction.delivery_fee }}<br>
    Cart:
  </p>
  <table class="table-auto mb-6">
    <thead>
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Price</th>
        <th class="px-4 py-2">Qty</th>
        <th class="px-4 py-2">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in transaction.cart" :key="item._id">
        <td class="border px-4 py-2">{{ item.product.name }}</td>
        <td class="border px-4 py-2">{{ item.product.price }}</td>
        <td class="border px-4 py-2">{{ item.quantity }}</td>
        <td class="border px-4 py-2">{{ item.quantity * item.product.price }}</td>
      </tr>
    </tbody>
  </table>

  <div>
    <div v-if="isAdmin">
      <button v-if="transaction.status == 'prepared'" @click.prevent="updateDelivery(transaction._id)" type="button" class="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
        Update Delivery
      </button>
      <!-- <button v-else-if="transaction.status != 'prepared'" @click.prevent="updateDelivery(transaction._id)" type="button" class="cursor-not-allowed px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
        Update Delivery
      </button> -->
    </div>
    <div v-if="!isAdmin">
      <button  v-if="transaction.status != 'recieved'" @click.prevent="recieved(transaction._id)" type="button" class="mr-1 px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
        Recieved
      </button>
      <button  v-if="transaction.status == 'recieved'" @click.prevent="recieved(transaction._id)" type="button" class="cursor-not-allowed mr-1 px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
        Recieved
      </button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDashboardDetail',
  props: {
    transaction: Object
  },
  data() {
    return {

    }
  },
  methods: {
    updateDelivery(id) {
      this.$axios({
        method: 'PATCH',
        url: `transactions/${id}/sent`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$emit('fetch-transactions')
          this.$swal.fire({
            title: 'Success!',
            text: 'Delivery status successfully updated',
            icon: 'success',
            confirmButtonText: 'Close'
          })
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
    recieved(id) {
      this.$axios({
        method: 'PATCH',
        url: `transactions/${id}/delivered`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$emit('fetch-transactions')
          this.$swal.fire({
            title: 'Success!',
            text: 'Delivery status successfully updated',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        })
        .catch(err => {
          this.$swal.fire({
            title: 'Error!',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
    }
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('isAdmin') === String(true)
    }
  }
}
</script>

<style>

</style>
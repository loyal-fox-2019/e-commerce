<template>
  <div class="p-4 border border-gray-300 m-4 rounded shadow-lg">
    <h2 class="text-lg bold my-2">Customer Form</h2>
    <form @submit.prevent="submitForm">
      <label class="">
        Name:
      </label>
      <input
        v-model="name"
        type="text"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        Address:
      </label>
      <input
        v-model="address"
        type="text"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        City:
      </label>
      <input
        v-model="destination"
        list="city-list"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <datalist id="city-list">
        <option v-for="city in cities" :key="city.city_id" :value="city.city_name" class="text-white"></option>
      </datalist>
      <span class="flex mb-2">Weight: {{ totalWeight }} kg</span>
      <div class="flex justify-between mb-2">
        <span class="">Total Price: </span>
        <span class="bold">Rp. {{ totalPrice }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="">Shipping Fee: </span>
        <span class="bold">Rp. {{ shippingFee }}</span>
      </div>
      <hr>
      <div class="flex justify-between my-2">
        <span class="font-bold">Total </span>
        <span class="bold">Rp. {{ totalPrice + shippingFee }}</span>
      </div>
      <button class="mt-2 border border-gray-600 w-full rounded py-1">Confirm Checkout</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'CustomerForm',
  data () {
    return {
      destination: '',
      name: '',
      address: ''
    }
  },
  methods: {
    ...mapActions(['submitCustomerForm']),
    submitForm() {
      let payload = {
        name: this.name,
        address: this.address,
        city: this.destination,
        shippingFee: this.shippingFee
      }
      console.log(payload, '++++++')
      this.submitCustomerForm(payload)
        .then(data => {
          this.$router.push('/transactions')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    }
  },
  computed: {
    ...mapState(['cities', 'shippingFee']),
    ...mapGetters(['totalPrice', 'totalWeight']),
    destinationId () {
      for (let city of this.cities) {
        if (city.city_name === this.destination) {
          return city.city_id
        }
      }
    }
  },
  watch: {
    destination (n, o) {
      let payload = {
        destinationId: this.destinationId,
        weight: this.totalWeight
      }
      this.$store.dispatch('getShippingFee', payload)
    }
  }
}
</script>

<style>

</style>
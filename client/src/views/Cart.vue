<template>
  <div style="width:100%" class="mt-5">
    <b-row>
      <div v-if="cart.length == 0" style="width:100%;text-align:center">
        <h1>Cart is empty</h1>
      </div>
      <div class="col-md-8">
        <CartList v-for="product in cart" :key="product._id" :product="product"/>
      </div>
      <div class="col-md-4">
        <div v-if="cart.length > 0" class="total-wrapper">
          <div>
            <h2>Total</h2>
            <hr />
            <h3>{{totalPrice}}</h3>
          </div>
          <b-button @click="checkoutCart" variant="dark">Checkout</b-button>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import CartList from '@/components/CartList.vue'
import server from '@/helpers/server'
import Swal from 'sweetalert2'
export default {
  name: 'cart',
  data () {
    return {
      deliverTo: '',
      deliverPrice: 0
    }
  },
  methods: {
    checkoutCart () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to checkout!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
        .then((result) => {
          if (result.value) {
            server({
              url: '/cart/checkout',
              method: 'POST',
              data: {
                cart: this.checkout,
                totalPrice: this.totalPrice
              },
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(result => {
                this.$store.dispatch('FETCH_CART')
                this.$store.dispatch('FETCH_TRANSACTION')
                Swal.fire('Added to checkout')
              })
              .catch(err => {
                Swal.fire(err.response.data.message)
              })
          }
        })
    }
  },
  components: {
    CartList
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    checkout () {
      let checkout = []
      let cart = this.$store.state.cart
      cart.forEach(product => {
        checkout.push({
          name: product.productId.name,
          price: product.productId.price,
          quantity: product.quantity
        })
      })
      return checkout
    },
    totalPrice () {
      let grandTotal = 0
      let cart = this.$store.state.cart
      cart.forEach(product => {
        let total = Number(product.productId.price) * Number(product.quantity)
        grandTotal += total
      })
      return grandTotal
    }
  }
}
</script>

<style scoped>
  .total-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

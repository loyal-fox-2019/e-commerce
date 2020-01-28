<template>
  <div class="container mx-auto flex flex-col md:flex-row">
    <h3 v-if="cart.length === 0" class="mt-20 mx-auto text-lg font-bold">Your cart is empty</h3>
    <div class="relative mx-auto mt-20 w-3/5 flex flex-col md:flex-row">
      <div class="p-4 md:w-1/2">
      <transition
        name="fade"
        v-for="product in cart" 
        :key="product._id" appear="">
        <CartItem 
          :product="product">
        </CartItem>
      </transition>
    </div>

    <div class="flex flex-col md:w-1/2">
      <div v-if="!isCheckedOut && cart.length > 0" class="p-4 border border-gray-300 m-4 h-40 rounded shadow-lg">
        <h2 class="text-lg bold my-2">Summary</h2>
        <div class="w-full">
          <div class="flex justify-between mb-2">
            <span class="">Total Price: </span>
            <span class="bold">Rp. {{ totalPrice }}</span>
          </div>
          <button @click.prevent="isCheckedOut = !isCheckedOut" class="border border-gray-600 w-full rounded py-1">Checkout</button>
        </div>
      </div>
      
      <transition name="fade">
        <CustomerForm v-if="isCheckedOut"></CustomerForm>
      </transition>
    </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
import CustomerForm from '../components/CustomerForm'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      isCheckedOut: false
    }
  },
  components: {
    CartItem,
    CustomerForm
  },
  created () {
    this.$store.dispatch('fetchCartItems')
    this.$store.dispatch('fetchCities')
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalPrice'])
  }
}
</script>

<style>
.fade-enter-active, .fade-enter {
  animation: bounce-in .5s
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
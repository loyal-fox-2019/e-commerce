<template>
  <div>
    <div v-if="userCart === null">Loading user cart..</div>
    <div v-if="userCart.length === 0">No items in cart!</div>
    <ShoppingCart
      v-else
      v-for="(cart, key) in userCart"
      :key="key"
      :cart="cart"
    ></ShoppingCart>
  </div>
</template>

<script>
import ShoppingCart from '../components/ShopingCart'
export default {
  name: 'UserCart',
  components: { ShoppingCart },
  computed: {
    userCart() {
      if (!this.$store.state.userCart) {
        this.$store.dispatch('getUserCart')
        return null
      } else {
        return this.$store.state.userCart
      }
    }
  }
}
</script>

<style></style>

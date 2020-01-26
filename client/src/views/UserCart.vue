<template>
  <div>
    <ShoppingCart
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
      return this.$store.state.userCart
    }
  }
}
</script>

<style></style>

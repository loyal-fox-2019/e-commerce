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
      console.log(this.$store.state.allTransaction)

      return this.$store.state.allTransaction
    }
  }
}
</script>

<style></style>

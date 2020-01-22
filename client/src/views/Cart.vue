<template>
<div>
<b-container id="cart">
    <h1>Your Cart</h1>
    <CartItems></CartItems>
</b-container>
<b-card
    title="Total Cart"
    header-tag="header"
    footer-tag="footer"
    header-bg-variant="warning"
    footer-bg-variant="warning"
    bg-variant="dark"
    text-variant="warning"
    id="total"
    >
      <template v-slot:header>
      </template>
      <b-card-text>Header and footers using slots.</b-card-text>
      <b-button href="#" variant="warning">Proceed to Checkout</b-button>
      <template v-slot:footer>
      </template>
    </b-card>
</div>
</template>

<script>
import CartItems from '../components/CartItems'
export default {
  name: 'Cart',
  components: {
    CartItems
  }
}
</script>

<style scoped>
    #cart {
        height: 65vh;
        color: #FFD300;
        margin-bottom: 0;
        overflow: scroll;
    }
    #total {
        margin-top: 0;
        height: 29vh;
    }
</style>

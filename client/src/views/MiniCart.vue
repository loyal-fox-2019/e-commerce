<template>
  <b-card
    title="Your Current Total"
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
      <b-card-text>Total: {{$route.params.totalAmount}}</b-card-text>
      <router-link to="/cart"><b-button variant="warning">See Cart</b-button></router-link>
      <template v-slot:footer>
      </template>
    </b-card>
</template>

<script>
export default {
  name: 'MiniCart',
  props: {
    totalAmount: {
      type: Number
    }
  }
}
</script>

<style scoped>

</style>

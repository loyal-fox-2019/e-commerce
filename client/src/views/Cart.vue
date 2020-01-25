<template>
  <div class="container p-3">
    <div class="row">
      <CartItem></CartItem>
      <div class="col-md">
        <div class="total-price d-block mx-auto shadow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  components: {
    CartItem
  }
}
</script>

<style>
.total-price {
  width: 85%;
  height: 40px;
}
</style>

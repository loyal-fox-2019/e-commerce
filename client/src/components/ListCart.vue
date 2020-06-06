<template>
<div class="container">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody v-for="cart in listCartsItem" :key="cart.id">
    <tr>
      <td>{{ cart.ProductId.name }}</td>
      <td>{{ cart.quantity }}</td>
      <td>{{ cart.sale_price }}</td>
      <td><a href="" @click.prevent="emitDelete(cart._id)"> <img src="../assets/quit.png" width="25"> </a> </td>
    </tr>
  </tbody>
</table>
<a href="" class="btn btn-warning" v-on:click.prevent="emitDeleteMany">Cart-Checkout</a>

</div>
</template>

<script>
export default {
    name: 'ListCarts',
    props: { listCartsItem: Array },
    methods: {
      emitDelete(value) {
        this.$emit('deleteChildCart', value);
      },
      emitDeleteMany() {
        this.$emit('deleteChildCartMany');
      }
    }
}
</script>

<style scoped>

</style>
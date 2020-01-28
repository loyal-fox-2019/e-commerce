<template>
  <div class="transaction-list-wrapper">
    <div class="id-transaction">
      <h5>Transaction #ID - {{itemTransaction._id}}</h5>
    </div>
    <hr />
    <ul v-for="cartItem in itemTransaction.cart" :key="cartItem.id">
      <li>{{cartItem.quantity}} pcs, {{cartItem.name}} - {{cartItem.price}}</li>
    </ul>
    <div class="total-price">{{itemTransaction.totalPrice}}</div>
    <b-button @click="confirmDelivery(itemTransaction._id)" variant="dark" v-if="itemTransaction.status==='onDelivery'">Confirm Delivery</b-button>
  </div>
</template>

<script>
export default {
  props: ['itemTransaction'],
  methods: {
    confirmDelivery (id) {
      this.$store.dispatch('CONFIRM_DELIVERY', id)
    }
  }
}
</script>

<style>
  .transaction-list-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 2rem;
    margin-bottom: 1rem;
    border: 1px solid #3e3e3e;
    border-radius: 8px;
  }
  .transaction-list-wrapper ul li {
    list-style: none;
  }
</style>

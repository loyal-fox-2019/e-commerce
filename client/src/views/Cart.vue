<template>
  <b-container>
      <b-row class="my-4" align-h="center">
          <h1>Your Cart</h1>
      </b-row>
      <b-row class="mt-5" align-h="center" style="border-bottom:black solid 1px;height:10vh;">
          <b-col cols="2" class="my-auto">
              Item
          </b-col>
          <b-col cols="2" class="my-auto">
              Price
          </b-col>
            <b-col cols="2" class="my-auto">
                Stock
            </b-col>
            <b-col cols="2" class="my-auto">
                qty
            </b-col>
            <b-col cols="1"></b-col>
      </b-row>
      <b-row class="mb-5 mt-3" align-h="center" style="height:10vh;" v-for="(cartItem, i) in this.$store.state.cartItems" :key="i">
          <b-col cols="2" class="my-auto">
              {{cartItem.productId.productName}}
          </b-col>
          <b-col cols="2" class="my-auto">
              {{cartItem.productId.price}}
          </b-col>
            <b-col cols="2" class="my-auto">
                {{cartItem.productId.stock}}
            </b-col>
            <b-col cols="2" class="my-auto">
                {{cartItem.qty}}
            </b-col>
            <b-col cols="1" class="my-auto"><b-button @click="deleteItem(cartItem._id)">delete</b-button></b-col>
      </b-row>
      <b-row align-h="center" class="my-5">
          <b-col>
              <b-row align-h="center">total: {{$store.state.totalCart}}</b-row>
              <b-row align-h="center" class="my-3"><b-button @click="checkOut">Proceed to checkout</b-button></b-row>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    minAmount () {
      if (this.amount <= 1) {
        this.amount = 1
      } else {
        this.amount -= 1
      }
    },
    maxAmount () {
      if (this.amount >= this.$store.state.chosenDetail.stock) {
        this.amount = this.$store.state.chosenDetail.stock
      } else {
        this.amount += 1
      }
    },
    deleteItem (id) {
      this.$store.dispatch('deleteItem', id)
    },
    checkOut () {
      this.$store.dispatch('checkOut')
    }
  }
}
</script>

<style scoped>

</style>

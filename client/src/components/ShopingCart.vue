<template>
  <div class="card mb-3 mt-5 mx-auto" style="max-width: 1200px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="cart.product.image"
          class="card-img mt-3"
          alt="ProductImage"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title borderBottomNya">{{ cart.product.name }}</h3>
          <h2 class="hargaNya">Rp. {{ price }}</h2>
          <h5 class="my-5">PRODUCT DESCRIPTION:</h5>
          <p>
            {{ cart.product.description }}
          </p>
          <label for="pesanan">Jumlah pesanan: </label>
          <h5>{{ cart.count }}</h5>
          <!-- <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p> -->
          <button
            @click.prevent="checkout"
            class=" btn btn-info mb-2"
            style="float:right"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ShoppingCart',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['cartCheckout']),
    checkout() {
      this.cartCheckout(this.cart._id)
    }
  },
  props: ['cart'],
  computed: {
    price() {
      return this.cart.product.price * this.cart.count
    }
  }
}
</script>

<style scoped>
.borderBottomNya {
  border-bottom: 1px solid #eeeedd;
  padding-bottom: 1.2vh;
}

.hargaNya {
  padding-top: 1vh;
  padding-bottom: 1vh;
}
</style>

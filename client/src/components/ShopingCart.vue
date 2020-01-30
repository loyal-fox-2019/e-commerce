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
          <span>
            <p
              class="py-1 px-3"
              style="background:#A9A9A9; color:white; width:fit-content; border-radius:30px;"
            >
              {{ cart.status }}
            </p>
            <h3 class="card-title borderBottomNya">{{ cart.product.name }}</h3>
          </span>
          <span> </span>
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
            @click.prevent="deleteCart"
            class=" btn btn-danger mb-2 ml-3"
            style="float:right"
          >
            Delete
          </button>
          <button
            v-show="checkoutButton"
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
    return {
      checkoutButton: true
    }
  },
  methods: {
    ...mapActions(['cartCheckout', 'deleteTransactions']),
    checkout() {
      this.cartCheckout(this.cart._id)
    },
    deleteCart() {
      this.deleteTransactions(this.cart._id)
    }
  },
  props: ['cart'],
  computed: {
    price() {
      return this.cart.product.price * this.cart.count
    }
  },
  watch: {
    cart: function(newValue, oldValue) {
      if (newValue.status !== 'cart') {
        this.checkoutButton = false
      }
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

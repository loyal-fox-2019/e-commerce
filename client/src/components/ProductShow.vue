<template>
  <div class="card mb-3 mt-5 mx-auto" style="max-width: 1200px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="product.image" class="card-img" alt="ProductImage" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title borderBottomNya">{{ product.name }}</h3>
          <h2 class="hargaNya">RP. {{ product.price }}</h2>
          <h5 class="my-5">PRODUCT DESCRIPTION:</h5>
          <p>
            {{ product.description }}
          </p>
          <label>Jumlah pesanan: </label>
          <input type="number" class="ml-3" v-model="pesanan" />
          <!-- <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p> -->
          <button
            @click="addUserCartAndRedirect"
            type="button"
            class=" mx-5 btn btn-info"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'productShow',
  data() {
    return {
      pesanan: null
    }
  },
  computed: {
    product() {
      return this.$store.state.productShow
    }
  },
  methods: {
    ...mapActions(['addUserCart']),
    addUserCartAndRedirect() {
      this.addUserCart({
        payload: this.pesanan,
        productId: this.product._id
      })
      this.$router.push({
        path: '/usercart'
      })
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

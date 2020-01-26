<template>
  <div
    class="item col-sm-12 col-md-6 col-lg-3 col-xl-2 mt-3 mr-sm-auto mr-md-auto mx-lg-0 mx-xl-0"
  >
    <div class="card">
      <img
        class="card-img-top tambahan"
        :src="product.image"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <h5>Rp. {{ product.price }}</h5>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
      <button
        @click.prevent="showProductCard"
        type="button"
        class="btn btn-info"
      >
        Show Details
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ProductCard',
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['SET_PRODUCTSHOW']),
    showProductCard() {
      this.SET_PRODUCTSHOW(this.product)
      this.$router.push('/productshow')
    }
  },
  props: ['product']
}
</script>

<style scoped>
.tambahan {
  height: 23.5vh;
}
</style>

<template>
  <div
    class="item col-sm-12 col-md-6 col-lg-3 col-xl-2 mt-3 mr-sm-auto mr-md-auto mx-lg-0 mx-xl-0"
  >
    <div class="card">
      <img
        class="card-img-top"
        src="http://simagenda.untag-sby.ac.id/uploads/katproduk/default/default-product.jpg"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h3>$ Price</h3>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
      <button
        @click.prevent="showProductCard"
        type="button"
        class="btn btn-info"
      >
        Buy
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data() {
    return {}
  },
  methods: {
    showProductCard() {
      this.$router.push('/products/productshow')
    }
  }
}
</script>

<style scoped></style>

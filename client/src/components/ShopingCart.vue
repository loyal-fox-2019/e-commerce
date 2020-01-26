<template>
  <div class="card mb-3 mt-5 mx-auto" style="max-width: 1200px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          src="http://simagenda.untag-sby.ac.id/uploads/katproduk/default/default-product.jpg"
          class="card-img"
          alt="ProductImage"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title borderBottomNya">Product Name</h3>
          <h2 class="hargaNya">Rp. 1000000</h2>
          <h5 class="my-5">PRODUCT DESCRIPTION:</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            accusantium itaque laboriosam ratione, dolores eaque, nulla ducimus
            voluptatem cum fugit quod accusamus. Soluta quis reprehenderit
            dolorum, magni ut officia atque.
          </p>
          <label for="pesanan">Jumlah pesanan: </label>
          <input type="number" class="ml-3" id="pesanan" />
          <!-- <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p> -->
          <button type="button" class=" mx-5 btn btn-info">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {}
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

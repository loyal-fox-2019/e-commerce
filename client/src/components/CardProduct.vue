<template>
  <div class="own-card shadow mb-4 mx-2">
    <div class="card-img">
      <img
        src="https://cf.shopee.co.id/file/3627aa52aaa09e3f30fd40ce985c7a2f"
        class="thumbnail-img"
        alt
      />
    </div>
    <div class="product-title">
      <h6>Speaker Bluetooth Harman/Kardon Aura 2</h6>
    </div>
    <div class="detail-wrapper">
      <p class="price-product">Rp. 762.000</p>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.own-card {
  height: 350px;
  width: 224px;
  border-radius: 8px;
}
.card-img {
  width: 100%;
  height: 224px;
  /* background-image: url('https://cf.shopee.co.id/file/3627aa52aaa09e3f30fd40ce985c7a2f');
  background-position: center;
  background-size: fit; */
}
.thumbnail-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 8px 8px 0 0;
}
.product-title {
  max-height: 47px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 10px 0 10px;
  line-clamp: 2;
}
.price-product {
  color: #f00;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 5px;
}
.detail-wrapper {
  padding: 3px 10px 10px 10px;
}
.checked {
  color: #f8c222;
}
</style>

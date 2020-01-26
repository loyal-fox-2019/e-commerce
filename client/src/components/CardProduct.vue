<template>
  <div class="own-card shadow mb-4 mx-2" @click="toDetail">
    <div class="card-img">
      <img :src="detail.thumbnail" class="thumbnail-img" alt />
    </div>
    <div class="product-title">
      <h6>{{ detail.productName }}</h6>
    </div>
    <div class="detail-wrapper">
      <p class="price-product">{{ changeFormatPrice }}</p>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detail'],
  computed: {
    changeFormatPrice() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.detail.price)
    }
  },
  methods: {
    toDetail() {
      this.$router.push('/products/' + this.detail._id)
    }
  }
}
</script>

<style scoped>
.own-card {
  height: 350px;
  width: 224px;
  border-radius: 8px;
}
.own-card:hover {
  cursor: pointer;
  transform: scale(1.1);
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

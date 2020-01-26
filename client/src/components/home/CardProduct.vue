<template>
  <div class="product" @click="detail">
    <div class="card border-0 shadow-sm">
      <img :src="product.image" class="card-img-top" alt="product image" />
      <div class="card-body">
        <div class="wrap-product-title">
          <span class="product-title">{{ product.name }}</span>
          <div class="wrap-discount">
            <div>61%</div>
            <div>Rp. 30.000</div>
          </div>
          <div class="wrap-price">
            <span class="price"> Rp. {{ product.price }} </span>
          </div>
          <div class="wrap-city">
            <span class="city"> <b-icon icon="award" variant="warning"></b-icon> Denpasar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  data() {
    return {};
  },
  props: ['product'],
  methods: {
    detail() {
      console.log('here');
      this.$router.push({ name: 'detail-product', params: { id: this.product._id } });
    },
  },
};
</script>

<style scoped>
.product {
  cursor: pointer;
  margin: auto;
}
.card {
  width: 222px !important;
}
.card img {
  height: 222px !important;
  width: 222px !important;
}
.card-body {
  margin: 0;
  padding: 0;
}
.wrap-product-title {
  position: relative;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding: 8px;
  overflow: hidden;
}
.product-title {
  color: rgba(0, 0, 0, 0.7);
  display: -webkit-box;
  max-height: 38px;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  overflow-wrap: break-word;
  overflow: hidden;
}
.wrap-discount {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 0.714286rem;
  margin: 4px 0px;
}
.wrap-discount div:nth-child(1) {
  width: 30px;
  height: 20px;
  background-color: rgb(255, 204, 217);
  font-weight: bold;
  color: rgb(239, 20, 74);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 3px;
}
.wrap-discount div:nth-child(2) {
  opacity: 0.4;
  color: rgb(49, 53, 59);
  margin-left: 4px;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: line-through;
  overflow: hidden;
}
.wrap-price .price {
  display: block;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: rgb(250, 89, 29);
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 22px;
  overflow: hidden;
}
.wrap-city {
  display: inline-block;
  text-overflow: ellipsis;
  height: 20px;
  vertical-align: top;
  overflow: hidden;
}
.city {
  display: block;
  width: 100%;
  font-size: 0.857143rem;
  height: 20px;
  color: rgba(0, 0, 0, 0.54);
  margin-top: 0px;
  text-overflow: ellipsis;
  transform: unset;
  max-width: 140px;
  overflow: hidden;
  transition: transform 0.3s ease 0s;
}
</style>

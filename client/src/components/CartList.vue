<template>
  <div class="product-wrapper">
    <div class="product-body">
      <img :src="product.productId.image">
      <div class="caption">
        <div class="product-name"><h4>{{ product.productId.name }}</h4></div>
        <div>Price: {{ product.productId.price }}</div>
        <div>Quantity: {{ product.quantity }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['product'],
  methods: {
  }
}
</script>

<style scoped>
.single-item {
  border: 1px dashed crimson;
}
.product-wrapper {
  width: 100%;
  margin-bottom: 1.4rem;
}
.product-body {
  display: flex;
  width: 100%;
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
}
.product-body:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: 0.4s box-shadow;
}
.product-name {
  height: 4rem;
}
.product-body img {
  height: 100px;
  margin-right: 1rem;
}
.caption {
  margin-top: auto;
  text-align: left;
  width: 100%;
}
</style>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-center mx-1">
      <img :src="product.image" alt srcset :width="product.width" :height="product.height">
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsCard",
  props: ["product"]
};
</script>

<style scoped>
img{
  background-color: #f5f5f5;
  border-radius: 7%;
}
.container img {
  background-color: #f5f5f5;
  min-width: 219px;
  max-height: 217px;
}
</style>
<template>
  <div class="container-fluid">
    <router-view />
    <div class="d-flex justify-content-center row">
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
    <!-- <ProductShow></ProductShow> -->
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
// import ProductShow from '../components/ProductShow.vue'
export default {
  name: 'ProductList',
  data() {
    return {}
  },
  components: {
    ProductCard
    // ProductShow
  }
}
</script>

<style scoped></style>

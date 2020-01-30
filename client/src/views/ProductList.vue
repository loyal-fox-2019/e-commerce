<template>
  <div class="container-fluid">
    <router-view />
    <div class="d-flex justify-content-center row">
      <ProductCard
        v-for="(item, key) in allItem"
        :key="key"
        :product="item"
      ></ProductCard>
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
  },
  computed: {
    allItem() {
      return this.$store.state.allitem
    }
  }
}
</script>

<style scoped></style>

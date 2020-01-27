<template>
<div id="homePage">
    <SearchBar></SearchBar>
    <b-container class="mt-5">
        <b-row cols="3">
            <b-col class="mt-2" v-for="(product, i) in products" :key="i">
                <ProductCards :productDetails="product"></ProductCards>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import SearchBar from '../components/SearchBar'
import ProductCards from '../components/ProductCards'
export default {
  name: 'Home',
  components: {
    SearchBar,
    ProductCards
  },
  props: {
    products: {
      type: Array
    }
  }
}
</script>

<style scoped>
    #homePage {
        height: 94vh;
    }
</style>

<template>
  <div class="home mx-3">
    <h5 class="my-4 text-center display-4">Top Release</h5>
    <h5 class="my-4 text-center display-9">Choose carefully, this collections are from the best designer around Town.</h5>
    <div class="container-fluid">
      <div class="d-flex align-content-around flex-wrap center">
        <ProductCard :product="product" v-for="product in products" :key="product._id" class="px-4 my-4"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "home",
  components: {
    ProductCard
  },
  computed:{
    ...mapState(['products'])
  },
  methods:{
    productDetails(){
      console.log('okeee')
    }
  },
  created(){
    if(!localStorage.getItem('token')){
      this.$router.push('/')
    }
    else{
      this.$store.dispatch('getAllProducts')
    }
  }
};
</script>

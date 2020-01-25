<template>
  <div class="home">
    <carousel></carousel>
    <div class="container d-block mx-auto">
      <div class="product row" v-if="!searchResult[0]">
        <ProductList v-for="product in allProducts" :item="product" :key="product.id"></ProductList>
      </div>
      <div class="product" v-else>
        <div class="d-flex">
          <h2>Search Result:</h2>
        </div>
        <div class="d-flex">
          <ProductList v-for="one in searchResult" :item="one" :key="one.id"></ProductList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import ProductList from "@/components/ProductList.vue";
import carousel from "@/components/carousel.vue";
export default {
  name: "home",
  components: {
    ProductList,
    carousel
  },
  props: {
    searchResult: {
      type: Array
    }
  },
  data() {
    return {
      allProducts: null,
      statusSearch: false
    };
  },
  created() {
    this.$emit("kosonginSearch");
    this.allProducts = null;
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    } else {
      axios({
        method: "GET",
        url: "http://localhost:3000/product/all"
      })
        .then(({ data }) => {
          this.allProducts = data;
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }

    if (this.searchResult[0] == undefined) {
      this.statusSearch = false;
    } else {
      this.statusSearch = true;
    }
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    } else {
      axios({
        method: "GET",
        url: "http://localhost:3000/product/all"
      })
        .then(({ data }) => {
          this.allProducts = data;
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  }
};
</script>

<style scoped>
.product {
  display: flex;
}
</style>


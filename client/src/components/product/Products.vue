<template>
  <div id="container-products">
    <Item
      v-for="product in products"
      :key="product._id"
      :item="product"
      style="width: 230px"
      class="dukduk"
    />
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import Item from "./Item";

export default {
  name: "Products",
  components: {
    Item
  },
  methods: {},
  computed: {
    products() {
      if (this.$route.path == "/") {
        return this.$store.state.products;
      } else {
        return this.$store.state.myProducts;
      }
    }
  },
  created() {
    // console.log(this.$route.path);
    if (localStorage.getItem("token")) {
      if (this.$route.path == "/") {
        this.$store.dispatch("fetchProducts");
      } else {
        this.$store.dispatch("fetchMyProducts");
      }
    }
  }
};
</script>

<style scoped>
.dukduk {
  margin: 20px !important;
}
.dukduk:hover {
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.164) !important;
  margin: 10px 20px !important;
}
#container-products {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}
</style>
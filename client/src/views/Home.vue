<template>
  <div class="home">
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    Navbar
    // ProductCard
  },
  created() {
    axios({
      method: "GET",
      url: `${this.$baseUrl}/products`
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

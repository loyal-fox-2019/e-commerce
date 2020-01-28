<template>
  <div class="home">
    <navbar :cartList="carts" @search="searchProduct($event)"></navbar>
    <router-view
      @updateCart="getAuthenticatedCart"
      :searchKeyword="keyword"
    ></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    Navbar
  },
  data() {
    return {
      carts: null,
      keyword: null
    };
  },
  methods: {
    searchProduct(keyword) {
      this.keyword = keyword;
    },
    getAuthenticatedCart() {
      axios({
        method: "GET",
        url: `${this.$baseUrl}/carts`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.carts = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.token) {
      this.getAuthenticatedCart();
    }
  }
};
</script>

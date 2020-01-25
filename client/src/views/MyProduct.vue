<template>
  <div class="mine">
    <div class="container d-block mx-auto">
      <div class="product row">
        <ProductList v-for="product in myProducts" :item="product" :key="product._id"></ProductList>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import ProductList from "@/components/ProductList.vue";
export default {
  name: "myProduct",
  components: {
    ProductList
  },
  data() {
    return {
      myProducts: null,
      baseUrl: "http://localhost:3000"
    };
  },
  created() {
    this.myProducts = null;
    let url = this.baseUrl;
    axios({
      method: "GET",
      url: `${url}/product/myProducts`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        // console.log(data);
        this.myProducts = data;
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err
        });
      });
  }
};
</script>

<style scoped>
.product {
  display: flex;
}
</style>
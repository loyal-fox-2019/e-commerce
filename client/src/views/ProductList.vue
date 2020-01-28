<template>
  <div>
    <b-row
      class="justify-content-center mx-5"
      v-if="products && products.length"
    >
      <b-col v-for="product in products" :key="product._id" class="p-0">
        <product-card
          :productData="product"
          @updateCart="$emit('updateCart', true)"
        ></product-card>
      </b-col>
    </b-row>
    <b-row v-else-if="products && !products.length">
      <b-col class="text-center">
        <h1 class="mt-5">
          Kesempatan nih jual barang dengan kata kunci
          <span class="font-weight-bold">{{ searchKeyword }}</span>
        </h1>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";

export default {
  props: ["searchKeyword"],
  name: "home",
  components: {
    ProductCard
  },
  data() {
    return {
      products: null
    };
  },
  methods: {
    getAllProducts() {
      axios({
        method: "GET",
        url: `${this.$baseUrl}/products`
      })
        .then(({ data }) => {
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterProducts(keyword) {
      axios({
        method: "GET",
        url: `${this.$baseUrl}/products`,
        params: {
          name: keyword
        }
      })
        .then(({ data }) => {
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllProducts();
  },
  watch: {
    searchKeyword(newVal) {
      this.filterProducts(newVal);
    }
  }
};
</script>

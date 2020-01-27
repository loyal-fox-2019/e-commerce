<template>
 <div class="text-center">
     <span >Stock by Product</span> <br>
    <bar-chart :chart-data="datacollection"></bar-chart>
 </div>
</template>

<script>
import BarChart from "./../BarChart.js";
import axios from "../api/server";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      datacollection: null,
      bawah : [],
      kiri : [],
    };
  },
  methods: {
    filldata() {
        this.datacollection = {
        labels: this.bawah,
        datasets: [
          {
            label: "Stock by Product",
            backgroundColor: "#8da7d7",
            pointBackgroundColor: "#f87979",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: this.kiri
          }
        ]
      }
    },
    fetchProducts() {
      axios
        .get("/products", {
          headers: {
            "access-token": localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "==== apa datanya");
          data.forEach(product => {
            this.bawah.push(product.name);
            this.kiri.push(product.stock);
          });
          this.filldata()
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
      this.fetchProducts()
  },
};
</script>

<style>
</style>
<template>
 <div class="text-center">
     <span>Overall Delivery Status of Transaction</span> <br>
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
    fetchTranscations() {
      axios
        .get("/transactions", {
          headers: {
            "access-token": localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "==== apa datanya");
          let received = 0
          let notreceived = 0
          data.forEach(transaction => {
              if(transaction.status == 'Received'){
                  received++
              }
              else{
                  notreceived++
              }
          });
          this.bawah.push('Received')
          this.kiri.push(received)
          this.bawah.push('On Delivery')
          this.kiri.push(notreceived)
          this.filldata()
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
      this.fetchTranscations()
  },
};
</script>

<style>
</style>
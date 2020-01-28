<template>
  <div>
    <div v-if="!allTransaction[0]">
      <h1>No history</h1>
    </div>
    <div v-else>
      <historyList v-for="(one, i) in allTransaction" :sejarah="one" :key="i"></historyList>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import historyList from "../components/historyList";
export default {
  name: "history",
  components: {
    historyList
  },
  data() {
    return {
      allTransaction: null,
      // baseUrl: "http://localhost:3000"
      baseUrl: "http://e-commerce-server.amadyanissa.my.id:3000"
    };
  },
  created() {
    let url = this.baseUrl;
    axios({
      method: "get",
      url: `${url}/product/history/transaction`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.allTransaction = data;
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

<style>
</style>
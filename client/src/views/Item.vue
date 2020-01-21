<template>
  <div class="item">
    <h1>{{ itemDetail.title }}</h1>
    <b-table stacked :items="itemDetail"></b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      itemDetail: null
    };
  },
  created() {
    console.log(localStorage.getItem('token'));
    axios
      .get(`http://127.0.0.1:52606/items/${this.$route.params.id}`)
      .then(({ data }) => {
        console.log(data);
        this.itemDetail = [data];
      })
      .catch(() => this.$router.push({ path: '/page-not-found' }));
  }
};
</script>

<style>
</style>
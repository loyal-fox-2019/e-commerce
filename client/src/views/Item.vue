<template>
  <div class="item container">
    <b-row class="mt-4">
      <b-col>
        <b-img
          thumbnail
          :src="itemDetail.image"
          fluid
          alt="Responsive image"
        ></b-img>
      </b-col>
      <b-col cols="8">
        <b-card class="text-left">
          <b-card-title>{{ itemDetail.title }}</b-card-title>
          <b-card-body>
            <b-card-sub-title>Description:</b-card-sub-title>
            <b-card-text v-html="fixedDescription"></b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
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
  computed: {
    fixedDescription() {
      return this.itemDetail.description.split('\\n').join('<br />');
    }
  },
  created() {
    console.log(localStorage.getItem('token'));
    axios
      .get(`http://localhost:3000/products/${this.$route.params.id}`)
      .then(({ data }) => {
        console.log(data.data);
        this.itemDetail = data.data;
      })
      .catch(() => this.$router.push({ path: '/page-not-found' }));
  }
};
</script>

<style scoped>
</style>
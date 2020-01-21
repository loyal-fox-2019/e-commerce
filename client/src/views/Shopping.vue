<template>
  <section id="main">
    <div>
      <b-nav-form class="mt-3 mb-3" @submit.prevent="SearchAttempt" id="form-search">
        <b-form-input v-model="query"
        v-debounce:300ms="SearchAttempt"
        size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">Search</b-button>
        <b-button
          v-show="isFind"
          size="sm"
          class="my-2 ml-2 my-sm-0"
          @click="showAll"
          variant="primary"
        >Show All</b-button>
      </b-nav-form>
      <div id="list" class="row justify-content-center">
        <card
          v-for="product in $store.state.products"
          :key="product._id"
          :product="product"
          class="ml-4"
        />
      </div>
    </div>
    <div id="detail" class="justify-content-center">
      <h3>Skins Detail HELLO</h3>
      <router-view />
    </div>
  </section>
</template>

<script>
import card from '../components/productCard.vue';
import axios from '../config/server';

export default {
  components: { card },
  data() {
    return {
      message: 'Hello world',
      query: '',
      isFind: false,
    };
  },
  methods: {
    showAll() {
      this.isFind = false;
      this.$store.dispatch('fetchProducts');
    },
    async SearchAttempt() {
      this.isFind = true;
      try {
        const response = await axios.get(`/products/search?query=${this.query}`);
        const { data } = response;
        this.$store.dispatch('findSkins', data);
      } catch (error) {
        // console.log(error);
        this.$swal('Opps... server down :(');
      }
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style scoped>
card {
  left: 20%;
}
#main {
  display: flex;
  justify-content: space-between;
}
#list {
  padding: 1em;
  margin-right: 10%;
  margin-top: 6px;
  width: 60vw;
  height: 80vh;
  margin-left: 1em;
  border: 2px solid white;
  overflow-y: scroll;
}
#detail {
  margin-right: 1em;
  display: inline-block;
}
#form-search {
  position: relative;
  left: 40%;
}
</style>

<template>
  <section id="main">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
      :loader="'bars'"
    ></loading>
    <div>
      <b-nav-form class="mt-3 mb-3" @submit.prevent="SearchAttempt" id="form-search">
        <b-form-input v-model="query"
        id="search"
        v-debounce:300ms="SearchAttempt"
        size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm"
          style="background-color: black;"
          class="my-2 my-sm-0" type="submit" variant="primary">Search</b-button>
        <b-button
          style="background-color: black;"
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
      <router-view
        class="animated fadeIn"
      />
    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import card from '../components/productCard.vue';
import axios from '../config/server';

export default {
  components: { card, Loading },
  data() {
    return {
      message: 'Hello world',
      query: '',
      isFind: false,
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    showAll() {
      this.query = '';
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
  justify-content: space-evenly;
}
#list {
  border-radius: 1em;
  padding: 1em;
  margin-right: 10%;
  margin-top: 6px;
  width: 60vw;
  height: 80vh;
  margin-left: 1em;
  border: 2px solid white;
  overflow-y: scroll;
}

#list::-webkit-scrollbar-track {
  border-radius: 2em;
  border: 1px solid black;
  background-color: #007bff;
}

#list::-webkit-scrollbar {
  border-radius: 1em;
  width: 10px;
  background-color: #F5F5F5;
}

#list::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: #000000;
}

#detail {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 4em;
  height: 78vh;
}
#form-search {
  position: relative;
  left: 40%;
}
</style>

<template>
  <div id="app">
    <loading
      :active.sync="$store.state.isLoading"
      :is-full-page="$store.state.fullPage"
      :loader="'bars'"
    ></loading>
    <div id="nav">
      <navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import Navbar from '@/components/navbar.vue';

export default {
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    //
  },
  created() {
    this.$store.dispatch('checkLogin');
  },
};
</script>

<style>
</style>

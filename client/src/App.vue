<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header></Header>
    <router-view @userLogin="userLogin" />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      isUserLogin: false
    };
  },
  components: {
    Header
    // Footer
  },
  methods: {
    userLogin() {
      console.log('OK');
    }
  }
};
</script>

<style></style>

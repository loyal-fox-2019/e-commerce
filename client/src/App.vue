<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {};
  },
  components: {
    Header
    // Footer
  }
};
</script>

<style></style>

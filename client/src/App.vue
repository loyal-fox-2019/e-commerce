<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view id="main-view"/>

  </div>
</template>

<script>
import Navbar from "./components/navbar.vue";
export default {
  name: "app",
  components: {
    Navbar
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main-view {
  top: 60px;
  position: absolute;
  height: calc(100vh - 60px);
}


</style>

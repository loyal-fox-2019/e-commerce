<template>
  <v-app id="app">
    <v-content>
      <Navbar></Navbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app{
  font-family: 'Roboto', sans-serif;
}
</style>

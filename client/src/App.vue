<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from './partials/Navbar'
import Footer from './partials/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  created() {
    if (localStorage.token) {
      this.$store.state.isLoggedIn = true
    }
  }
}
</script>

<style scoped>
#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>

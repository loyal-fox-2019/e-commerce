<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import NavBar from '../src/components/NavBar'
import Footer from '../src/components/Footer'
export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
body {
  background-color: #f1f1f1;
}
</style>

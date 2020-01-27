<template>
  <div id="app">
    <TheNavbar class=""></TheNavbar>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
export default {
  components: {
    TheNavbar
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('SET_IS_LOGGED_IN', true)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');
body {
  font-family: 'Lato'
}
</style>

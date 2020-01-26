<template>
  <div id="app">
    <TheNavbar></TheNavbar>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
export default {
  components: {
    TheNavbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');
body {
  font-family: 'Lato'
}
</style>

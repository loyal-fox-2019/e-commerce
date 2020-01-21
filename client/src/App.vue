<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>
<script>
import NavBar from '../src/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style></style>

<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <Modal></Modal>
    <router-view />
  </div>
</template>

<script>
import HeaderNav from './components/Header'
import Modal from './components/Modal'

export default {
  name: 'app',
  components: {
    HeaderNav,
    Modal
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  max-width: 100vw;
}
</style>

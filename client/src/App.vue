<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <Modal></Modal>
    <CartDetail></CartDetail>
    <router-view />
  </div>
</template>

<script>
import HeaderNav from '@/components/Header'
import Modal from '@/components/Modal'
import CartDetail from '@/components/CartDetail'

export default {
  name: 'app',
  components: {
    HeaderNav,
    Modal,
    CartDetail
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.commit('CHANGE_STATUS')
      this.$store.dispatch('FETCH_CART')
    }
    if (localStorage.getItem('admin')) {
      this.$store.commit('CHANGE_ADMIN')
    }
    this.$store.dispatch('FETCH_ALL_ITEM')
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  max-width: 100%;
}
</style>

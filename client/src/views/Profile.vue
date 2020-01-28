<template>
  <div class="container-fluid bg-gray-300">
    <div class="container flex flex-col h-screen">
      <nav class="my-4 bg-gray-400 py-3">
        <router-link
          class="text-black text-decoration-none px-4 py-3 hover:bg-teal-500 rounded"
          to="/profile"
          >Profile</router-link
        >
        <router-link
          class="text-black text-decoration-none px-4 py-3 hover:bg-teal-500 rounded"
          to="/profile/sell-list"
          >List Penjualan</router-link
        >
        <router-link
          class="text-black text-decoration-none px-4 py-3 hover:bg-teal-500 rounded"
          to="/profile/buy-list"
          >List Pembelian</router-link
        >
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      activePage: false
    }
  },
  created() {
    this.$store.dispatch('getMyInv')
  }
}
</script>

<style></style>

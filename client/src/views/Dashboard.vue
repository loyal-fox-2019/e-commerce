<template>
  <div class="d-flex bd-highlight">
    <Navbar />
    <div class="p-2 flex-grow-1 bd-highlight">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/NavbarAdmin';

export default {
  components: {
    Navbar
  },
  created() {
    const valid = localStorage.getItem('token');
    if (!valid) {
      this.$router.push('/');
    } else {
      this.$store.dispatch('fetchSendingAllCart');
      this.$store.dispatch('fetchReceivedAllCart');
      this.$store.dispatch('fetchCheckoutAllCart');
    }
  },
}
</script>

<style>

</style>

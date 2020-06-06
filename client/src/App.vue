<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>
<script>

export default {
  components: {
    // Home,
    // Admin,
  },
  created() {
    const token = localStorage.getItem('ecommerce.token');
    if (token) {
      this.$store.dispatch('tokenIsValid', {
        token,
      });
    }
  },
};
</script>

<style></style>

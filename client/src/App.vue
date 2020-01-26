<template>
  <div id="app">
    <!-- <template v-if="!$route.meta.isLoggedIn">
      <Home />
    </template>
    <template v-if="$route.meta.isAdmin">
      <Admin />
    </template> -->
    <router-view> </router-view>
  </div>
</template>
<script>
// import Home from './views/home/Index.vue';
// import Admin from './views/admin/Index.vue';

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

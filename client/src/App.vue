<template>
  <div id="app">
    <template v-if="this.$route.name == 'home'">
      <router-view />
    </template>
    <template v-elseif="$store.state.isLogin.role == 'Admin'">
      <Admin />
    </template>
  </div>
</template>
<script>
import Admin from './views/admin/Index.vue';

export default {
  components: {
    Admin,
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

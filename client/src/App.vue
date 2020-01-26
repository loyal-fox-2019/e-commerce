<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$store.commit('SET_LOGIN', true);
    }
  },
};
</script>

<style>

</style>

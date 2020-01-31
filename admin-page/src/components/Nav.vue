<template>
  <div class="text-center">
    <b-nav>
      <b-nav-item @click="changePage('history')">Transaction history</b-nav-item>
      <b-nav-item @click="changePage('post')">Post new product</b-nav-item>
      <b-nav-item @click="logout">LOGOUT</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    changePage(value) {
      this.$emit('changepage', value);
    },
    logout() {
      localStorage.clear();
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">Dashboard SHOP</div>
    <div class="list-group list-group-flush">
      <router-link to="/dashboard" class="list-group-item list-group-item-action bg-light"
        >Dashboard</router-link
      >
      <router-link to="/products" class="list-group-item list-group-item-action bg-light"
        >Products</router-link
      >
      <router-link to="/transactions" class="list-group-item list-group-item-action bg-light"
        >Transactions</router-link
      >
      <router-link to="/users" class="list-group-item list-group-item-action bg-light"
        >Users</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>

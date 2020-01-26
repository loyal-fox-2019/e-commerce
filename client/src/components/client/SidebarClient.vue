<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">Dashboard SHOP</div>
    <div class="list-group list-group-flush">
      <router-link to="/clientarea" class="list-group-item list-group-item-action bg-light"
        >Carts</router-link
      >
      <router-link to="/transactions" class="list-group-item list-group-item-action bg-light"
        >Transactions</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarClient',

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>

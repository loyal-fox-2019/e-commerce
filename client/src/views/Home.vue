<template>
  <div class="home">
    <div id="container">
      <Products />
    </div>
  </div>
</template>

<script>
import Products from "../components/product/Products";
export default {
  name: "home",
  components: {
    Products
  },
  created() {
    if (!localStorage.getItem("token")) this.$router.replace("/login");
  }
};
</script>

<style scoped>
#container {
  width: 100vw;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
}
</style>
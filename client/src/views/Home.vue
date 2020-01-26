<template>
  <div class="home">
    <NavBar />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  name: "home",
  components: {
    NavBar
  },
  created() {
    if (!localStorage.getItem("token")) this.$router.replace("/login");
  }
};
</script>

<style scoped>
</style>
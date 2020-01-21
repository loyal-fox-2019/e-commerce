<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    Navbar
  }
};
</script>

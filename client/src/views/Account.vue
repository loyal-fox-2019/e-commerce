<template>
  <div class="account">
    <loginRegister @checkLogin="checkLogin"></loginRegister>
  </div>
</template>

<script>
// @ is an alias to /src
import loginRegister from "@/components/loginRegister.vue";

export default {
  name: "account",
  components: {
    loginRegister
  },
  methods: {
    checkLogin() {
      this.$emit("checkLogin");
    }
  }
};
</script>

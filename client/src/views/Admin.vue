<template>
  <div class="admin">
    <tableAdmin @checkLogin="checkLogin"></tableAdmin>
  </div>
</template>

<script>
// @ is an alias to /src
import tableAdmin from "@/components/tableAdmin.vue";

export default {
  name: "admin",
  components: {
    tableAdmin
  },
  methods: {
    checkLogin() {
      this.$emit("checkLogin");
    }
  }
};
</script>

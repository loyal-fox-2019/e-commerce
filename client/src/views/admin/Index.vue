<template>
  <div class="d-flex" id="wrapper" :class="{ toggled: toggled }">
    <Sidebar />
    <div id="page-content-wrapper">
      <NavAdmin @menuToggle="menuToggle" />
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';
import NavAdmin from '@/components/admin/NavAdmin.vue';
import '@/assets/css/dashboard.css';

export default {
  name: 'Index',

  data() {
    return {
      toggled: false,
    };
  },
  components: {
    Sidebar,
    NavAdmin,
  },
  methods: {
    menuToggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style lang="css"></style>

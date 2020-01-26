<template>
  <div class="d-flex" id="wrapper" :class="{ toggled: toggled }">
    <SidebarClient />
    <div id="page-content-wrapper">
      <NavClient @menuToggle="menuToggle" />
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarClient from '@/components/client/SidebarClient.vue';
import NavClient from '@/components/client/NavClient.vue';
import '@/assets/css/dashboard.css';

export default {
  name: 'Index',

  data() {
    return {
      toggled: false,
    };
  },
  components: {
    SidebarClient,
    NavClient,
  },
  methods: {
    menuToggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style lang="css"></style>

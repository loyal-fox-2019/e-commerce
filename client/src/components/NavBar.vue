<template>
  <b-navbar type="light" variant="light" v-if="locally">
    <b-navbar-brand to="/home">CulCommerce</b-navbar-brand>
    <b-nav-form class="ml-auto mr-auto" @submit.prevent="cari">
      <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
    <b-navbar-nav>
      <b-breadcrumb-item to="/cart/myproduct">
        My Menu
        <i class="clipboard list icon"></i>
      </b-breadcrumb-item>
      <b-breadcrumb-item @click.prevent="deleteLocal" to="/login">
        Sign Out
        <i class="sign-out icon"></i>
      </b-breadcrumb-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      cariIni: ""
    };
  },
  methods: {
    deleteLocal() {
      localStorage.removeItem("token");
    },
    cari() {
      console.log(this.cariIni);
    }
  },
  computed:{
    locally(){
      return localStorage.getItem('token')
    }
  }
};
</script>

<style scoped>
</style>
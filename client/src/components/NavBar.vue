<template>
  <b-navbar type="light" variant="light" v-if="$store.state.isLogin">
    <b-navbar-brand to="/home"><i class="home icon"></i> CulCommerce</b-navbar-brand>
      <sui-input placeholder="Search..." icon="search" class="ml-auto mr-auto" v-model="cariIni" />
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
      cariIni: "",
    };
  },
  watch:{
    cariIni:function(val){
      if(this.$route.path != '/'){
        this.$router.push('/')
      }
      this.$store.commit('fillFilter', val)
    }
  },
  methods: {
    deleteLocal() {
      localStorage.removeItem("token");
      this.$store.state.isLogin = false;
      this.signOut
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    cari() {
      console.log(this.cariIni);
    }
  },
  computed: {},
};
</script>

<style scoped>
</style>
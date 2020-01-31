<template>
  <div id="app">
    <navbar v-if="!isLogin"></navbar>
    <navbarLogged @isLogout="isLogout" v-if="isLogin"></navbarLogged>
    <router-view @checkLogin="checkLogin" />
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import navbarLogged from "@/components/navbarLogged.vue";
export default {
  components: {
    navbar,
    navbarLogged
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    checkLogin() {
      if (localStorage.token) {
        this.isLogin = true;
      }
    },
    isLogout() {
      localStorage.clear();
      this.isLogin = false;
    }
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<template>
  <div id="app">
    <img
     src="https://images.unsplash.com/photo-1572152269271-c652a70dd517?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
     alt=""
     id="gambar">
    <NavBar style="font-size: 1.1rem; height: 7vh;" class="p-4"/>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import NavBar from "./components/NavBar";
export default {
  name: "Login",
  components: {
    NavBar
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.state.isLogin = true;
    }
  }
};
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.9rem;
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

#gambar {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -100;
  top: 0;
  left: 0;
  opacity: 0.7;
}
</style>

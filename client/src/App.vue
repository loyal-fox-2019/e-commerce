<template>
  <div id="app">
    <NavBar :logStatus="isLogin" @loginPassed="loggedIn" @logoutPassed="loggedOut"></NavBar>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from '../src/components/NavBar.vue'

export default {
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    NavBar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  },
  methods: {
    loggedIn () {
      this.isLogin = true
    },
    loggedOut () {
      this.isLogin = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/homeBG.jpg');
  overflow: scroll;
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

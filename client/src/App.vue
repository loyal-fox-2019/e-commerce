<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'app',
  components: {
    NavBar
  },
  created () {
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN')
      this.$store.dispatch('userCart')
    }
    if (localStorage.getItem('email')) {
      this.$store.commit('SET_ADMIN')
    }
    this.$store.dispatch('getAllProducts')
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

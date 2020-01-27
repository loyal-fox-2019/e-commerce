<template>
  <div id="app">
    <NavBar :logStatus="isLogin" @loginPassed="loggedIn(event)" @logoutPassed="loggedOut"></NavBar>
    <div class="main">
      <router-view :products="allProducts" :logStatus="isLogin"/>
    </div>
  </div>
</template>

<script>
import NavBar from '../src/components/NavBar.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      isLogin: false,
      allProducts: null
    }
  },
  components: {
    NavBar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
    axios({
      method: 'get',
      url: 'http://localhost:3000/products'
    })
      .then(({ data }) => {
        this.allProducts = data
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        })
      })
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

<template>
  <div id="app">
    <Navbar 
    v-bind:isLoggedIn="isLoggedIn"
    v-bind:isAdmin="isAdmin"
    v-on:userLogOut="changeIsLoggedIn()"></Navbar>
    <router-view 
    v-bind:isLoggedIn="isLoggedIn" 
    v-on:userRegister="changeIsLoggedIn()"
    v-on:userLogin="changeIsLoggedIn()"/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

<script>
import Navbar from '@/components/navbar.vue';
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }
  },
  created() {
    if(localStorage.getItem('token') && localStorage.getItem('USERTYPE')) {
      this.isLoggedIn = true;
      this.isAdmin = true;
    } else if(localStorage.getItem('token') && !localStorage.getItem('USERTYPE')) {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
  },
  methods: {
    changeIsLoggedIn: function() {
      if(!this.isLoggedIn && localStorage.getItem('USERTYPE')) {
        this.isLoggedIn = true;
        this.isAdmin = true;
      } else if(!this.isLoggedIn && !localStorage.getItem('USERTYPE')) {
        this.isLoggedIn = true;
        this.isAdmin = false;
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    }
  }
}
</script>

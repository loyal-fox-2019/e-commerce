<template>
  <v-app id="app">
    <v-content>
      <Navbar @logout="logout" v-if="loggedIn===true"></Navbar>
      <router-view @login="login"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    loggedIn : false
  }),

  methods : {
    login(){
      this.loggedIn = true
    },
    logout(){
      this.loggedIn = false
    }
  },
  created(){
    if(!localStorage.token){
      this.$router.push('/login')
      return
    }else{
    this.loggedIn=true
    }
  }
};
</script>

<style>
#app{
  font-family: 'Roboto', sans-serif;
}
</style>

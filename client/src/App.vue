<template>
  <div id="app">
    <Navbar/>
    <Login/>
    <Register/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import Login from '@/components/Login'
import Register from '@/components/Register'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default {
  name:'App',
  components:{
    Login,
    Register,
    Navbar,
    Footer
  },
  methods:{
    ...mapMutations(["changeIsLogin","changeAdmin"])
  },
  created(){
    if(localStorage.getItem('token')){
      this.changeIsLogin()
    }
    if(localStorage.getItem('role') == 'admin'){
      console.log('saya adalah admin woyyy')
      this.$store.commit('changeAdmin')
    }
  }
}
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

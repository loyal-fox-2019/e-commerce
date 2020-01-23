<template>
  <!-- <b-container fluid id="container">
    <b-row class="pt-5 pb-4" align-h="center">
      <Login></Login>
    </b-row>
  </b-container> -->
  <b-container fluid id="container">
        <b-row class="pt-5 pb-4" align-h="center">
            <h1><i class="fas fa-shopping-bag fa-lg"></i> E-Commerce</h1>
        </b-row>
        <b-row align-v="top" align-h="center" id="row">
            <b-col cols="5">
                <b-nav tabs fill>
                    <b-nav-item class="nav-item" @click="viewLogin">Login</b-nav-item>
                    <b-nav-item class="nav-item" @click="viewRegister">Register</b-nav-item>
                </b-nav>
                <div class="border border-top-0 rounded-bottom" id="isi">
                    <Login v-if="showLogin"></Login>
                    <Register v-if="showRegister"></Register>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Login from '../components/Login'
import Register from '../components/Register'
export default {
  name: 'login-register',
  data(){
    return{
        showLogin: true,
        showRegister: false
    }
  },
  methods: {
    viewLogin: function(){
      this.showLogin = true
      this.showRegister = false
    },
    viewRegister: function(){
      this.showLogin = false
      this.showRegister = true
    }
  },
  components: {
    Login,
    Register
  }
}
</script>

<style scoped>
  #container {
    height: 100vh;
    background-color: rgb(255, 255, 255);
  }
  .nav-item {
    font-size: 20px;
    font-weight: bold;
  }
  #row {
    height: 70vh;
  }
  
  #isi {
    background-color: rgb(148, 204, 134);
  }
</style>
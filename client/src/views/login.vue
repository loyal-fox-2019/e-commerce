<template>
      <form class="form-signin mx-auto" style="width: 30vw; height: 70vh;margin-top: 20vh;">
        <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <button class="btn btn-lg btn-primary btn-block" v-on:click.prevent="loginUser" type="submit">Log in</button>
        <p>or</p>
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
        <p><router-link :to="`/register`">Register Here</router-link></p>
        <p class="mt-5 mb-3 text-muted">© 2020-2021</p>
    </form>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
export default {
  name: 'login',
  components: {
    GoogleLogin
  },
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    loginUser(){
      console.log('masuk login')
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data:{
          email: this.email,
          password: this.password
        }
      })
      .then(({data})=>{
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.payload._id)
        localStorage.setItem('email', data.payload.email)
        this.$router.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
input{
  margin-top:2vh;
}
</style>
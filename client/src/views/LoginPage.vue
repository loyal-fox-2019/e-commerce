<template>
  <div>
    <NavigationBar />
    <b-form v-if='showLogin' class="col-md-8 offset-md-2" @submit.prevent="login">
      <h2>Login</h2>
      <b-form-group>
        <b-form-input
          type="text"
          required
          placeholder="Enter email or username"
          v-model='user'
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="password"
          required
          placeholder="Enter password"
          v-model='password'
        ></b-form-input>
      </b-form-group>
      <b-button type='submit' variant='primary'>Login</b-button>
      <h5 class="mt-5">or <span @click='toggle' class="make-link">register</span> here</h5>
    </b-form>
    <b-form v-if='!showLogin' class="col-md-8 offset-md-2" @submit.prevent="register">
      <h2>Register</h2>
      <b-form-group>
        <b-form-input
          type="text"
          required
          placeholder="Enter username"
          v-model='username'
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="text"
          required
          placeholder="Enter email"
          v-model='email'
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="password"
          required
          placeholder="Enter password"
          v-model='password'
        ></b-form-input>
      </b-form-group>
      <b-button type='submit' variant='primary'>Register</b-button>
      <h5 class="mt-5">or <span class="make-link" @click='toggle'>login</span> here</h5>
    </b-form>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {

  name: 'LoginPage',
  components: {
    NavigationBar
  },
  data () {
    return {
      user: '',
      username: '',
      email: '',
      password: '',
      showLogin: true
    }
  },
  methods: {
    login(){
      let userData = {
        user: this.user, 
        password: this.password
      }
      this.$store.dispatch('login', userData)
        .then((data) => {
          this.afterLogin(data)
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    },
    register(){
      let userData = {
        username: this.username, 
        password: this.password,
        email: this.email
      }
      this.$store.dispatch('register', userData)
        .then((data) => {
          this.afterLogin(data)
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    },
    afterLogin(data){
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('username', data.username)
      this.$router.push('home')
    },
    toggle(){
      this.showLogin = !this.showLogin
      this.user = ''
      this.username = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style lang="css" scoped>
.make-link{
  cursor:pointer;
  color:blue;
  text-decoration:underline;
}
</style>
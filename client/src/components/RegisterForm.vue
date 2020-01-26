<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-alert type="error" v-for="(error, i) in errors" :key="i">
        {{error}}
      </v-alert>
      <v-form @submit.prevent="register" id="register-form">
        <v-text-field
          required
          label="Email"
          name="login"
          prepend-icon="person"
          type="email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          required
          label="Username"
          name="username"
          prepend-icon="store"
          type="text"
          v-model="username"
        ></v-text-field>
        <v-file-input
          required
          label="Foto"
          filled
          prepend-icon="mdi-camera"
          v-model="profile_pic"
        ></v-file-input>
        <v-text-field
          required
          id="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <span>
        already have an account? <a @click="toLogin">Login.</a>
      </span>
      <v-spacer></v-spacer>
      <v-btn color="primary" type="submit" form="register-form">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'RegisterForm',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      profile_pic: null,
      errors: []
    }
  },
  methods: {
    toLogin () {
      this.$emit('to-login')
    },
    register () {
      this.errors = []
      const formData = new FormData()
      formData.set('username', this.username)
      formData.set('password', this.password)
      formData.set('email', this.email)
      formData.set('profile_pic', this.profile_pic)
      axios({
        method: 'POST',
        url: `/register`,
        data: formData
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Register success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.commit('LOGIN')
          this.$store.commit('SET_USERNAME', data.username)
          this.$store.dispatch('fetchPending')
          this.$store.dispatch('fetchPaid')
          this.$store.dispatch('fetchDelivered')
          this.$router.push('/')
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    }
  }
}
</script>

<style>

</style>

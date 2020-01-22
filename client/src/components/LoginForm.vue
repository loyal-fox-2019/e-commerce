<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Please Sign in</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-alert type="error" v-for="(error, i) in errors" :key="i">
        {{error}}
      </v-alert>
      <v-form @submit.prevent="login">
        <v-text-field
          label="Email"
          name="login"
          prepend-icon="person"
          type="email"
          v-model="email"
        ></v-text-field>

        <v-text-field
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
        dont have an account? <a @click="toRegister">Register.</a>
      </span>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'LoginForm',
  data () {
    return {
      errors: [],
      email: '',
      password: ''
    }
  },
  methods: {
    toRegister () {
      this.$emit('to-register')
    },
    login () {
      this.errors = []
      axios({
        method: 'POST',
        url: `/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          // console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.email = ''
          this.password = ''
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.commit('LOGIN')
          this.$store.commit('SET_USERNAME', data.username)
          this.$store.dispatch('fetchPending')
          this.$store.dispatch('fetchPaid')
          this.$router.push('/')
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    }
  }
}
</script>

<style>

</style>

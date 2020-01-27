<template>
  <div>
    <b-button variant="secondary" text-variant="warning" v-b-modal.modal-center id="loginToggle">Login</b-button>

    <b-modal
      id="modal-center"
      size="lg"
      centered
      header-bg-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      hide-footer
    >
      <b-container fluid="sm">
        <b-row class="justify-content-md-center">
          <b-col id="loginForm">
            <center>
              <h2>Login</h2>
            </center>
            <b-form>
              <b-form-group id="login-email" label="Email address:" label-for="loginEmail">
                <b-form-input
                  id="loginEmail"
                  type="email"
                  v-model="login.email"
                  required
                  placeholder="Enter your email address here . . ."
                ></b-form-input>
              </b-form-group>
              <b-form-group id="login-password" label="Password :" label-for="loginPassword">
                <b-form-input
                  id="loginPassword"
                  type="password"
                  v-model="login.password"
                  required
                  placeholder="Enter your password here . . ."
                ></b-form-input>
              </b-form-group>
              <b-form-group id="login-button" label-for="loginButton">
                <b-button block variant="warning" @click="webLogin">Login</b-button>
              </b-form-group>
            </b-form>
            <center>
              <h4>Or sign in using:</h4>
            </center>
          </b-col>
          <b-col id="registerForm">
            <center>
              <h2>Register</h2>
            </center>
            <b-form>
              <b-form-group id="register-name" label="Your name:" label-for="registerName">
                <b-form-input
                  id="registerName"
                  type="text"
                  v-model="register.name"
                  required
                  placeholder="Enter your name here . . ."
                ></b-form-input>
              </b-form-group>
              <b-form-group id="register-address" label="Address:" label-for="registerAddress">
                <b-form-textarea
                  id="registerAddress"
                  placeholder="Enter your address here . . ."
                  v-model="register.address"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                id="register-email"
                label="Email address:"
                label-for="registerEmail"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="registerEmail"
                  type="email"
                  v-model="register.email"
                  required
                  placeholder="Enter your email address here . . ."
                ></b-form-input>
              </b-form-group>
              <b-form-group id="register-password" label="Password :" label-for="registerPassword">
                <b-form-input
                  id="registerPassword"
                  type="password"
                  v-model="register.password"
                  required
                  placeholder="Enter your password here . . ."
                ></b-form-input>
              </b-form-group>
              <b-form-group id="register-button" label-for="registerButton">
                <b-button block variant="warning" @click="registration">Register</b-button>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'SignInButton',
  data () {
    return {
      register: {
        name: '',
        address: '',
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    webLogin () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in as ' + this.login.email
          })
          this.$bvModal.hide('modal-center')
          this.$emit('justLoggedIn', true)
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    registration () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: {
          name: this.register.name,
          address: this.register.address,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in as ' + this.register.email
          })
          this.$bvModal.hide('modal-center')
          this.$emit('justLoggedIn', true)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  }
}
</script>

<style scoped>
 #loginForm {
    border-right: 2px solid black;
  }
</style>

<template>
  <div>
    <b-modal id="modal-1" title="Login" hide-footer>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary mb-3"
          @click.prevent="loginUser"
        >
          Login
        </button>
        <h5>
          Dont have an account?
          <span @click.prevent="registerPage">Register Here</span>
        </h5>
        <g-signin-button
          class="btn btn-primary mt-2 center"
          id="googleSign"
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Sign in with Google
        </g-signin-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ModalLogin',
  data() {
    return {
      googleSignInParams: {
        client_id:
          '39280325118-0f1kq46pa26do9n4ksd33qie5fn37rhq.apps.googleusercontent.com'
      },
      email: '',
      password: ''
    }
  },
  methods: {
    registerPage() {
      this.$router.push('/register')
      this.$bvModal.hide('modal-1')
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const idToken = googleUser.getAuthResponse().id_token
      axios
        .post(`${this.$store.state.baseUrl}/user/google`, {
          id_token: idToken
        })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          this.$store.commit('CHANGE_STATUS')
          Swal.fire('Login Succes', 'Welcome back!', 'success')
          this.$bvModal.hide('modal-1')
        })
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    loginUser() {
      const data = {
        email: this.email,
        password: this.password
      }
      const url = this.$store.state.baseUrl
      axios
        .post(`${url}/user/login`, data)
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          this.$store.commit('CHANGE_STATUS')
          console.log(response.data.role)
          Swal.fire('Login Succes', 'Welcome back!', 'success')
          this.$bvModal.hide('modal-1')
          if (response.data.role === 'admin') {
            console.log('admin was here')
            localStorage.setItem('admin', true)
            this.$store.commit('CHANGE_ADMIN')
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops... ' + err.response.status,
            text: err.response.data.message
          })
        })
    }
  }
}
</script>

<style lang="css" scoped>
span {
  font-weight: 700;
  color: blue;
  cursor: pointer;
}
</style>

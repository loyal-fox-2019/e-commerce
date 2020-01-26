<template>
  <div class="login">
    <img
      src="../assets/brand-logo.png"
      alt="brand"
      class="d-block mx-auto mb-3"
    />
    <div class="card form-login shadow d-block mx-auto">
      <div class="form-header">
        <h5>Login</h5>
      </div>
      <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control focus-green"
            id="email"
            aria-describedby="emailHelp"
            autocomplete="off"
            v-model="email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Example : example@mail.com</small
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control focus-green"
            id="password"
            v-model="password"
          />
        </div>
        <button class="btn btn-success btn-login mb-3" @click.prevent="login">
          Login
        </button>
      </form>
      <div class="separator">
        <small class="text-muted">Or Login With</small>
      </div>
      <button class="btn btn-light btn-google my-3">
        Google
      </button>
      <p align="center">
        <small class="text-muted">
          Don't Have an Account ?
          <router-link to="register">
            <b class="text-success">Click Here</b>
          </router-link>
        </small>
      </p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username === '' || this.password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Input Username and Password First'
        })
      } else {
        axios
          .post('http://localhost:3000/users/login', {
            email: this.email,
            password: this.password
          })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            this.$store.state.isLogin = true
            this.$router.push('/')
          })
          .catch(({ response }) => {
            // console.log(err.response)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.message
            })
          })
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding: 30px;
  background-color: #f1f1f1;
  min-height: 94vh;
}
.form-login {
  width: 27%;
  border-radius: 20px;
  padding: 20px;
}
.form-header {
  margin-bottom: 2em;
}
.focus-green:focus {
  border-color: rgba(92, 184, 92, 0.8);
  box-shadow: 0 1px 1px rgba(92, 184, 92, 0.075) inset,
    0 0 8px rgba(92, 184, 92, 0.6);
  outline: 0 none;
}
.btn-login {
  width: 100%;
  font-weight: 700;
  font-size: 1.1em;
}
.btn-google {
  font-size: 1.1em;
  font-weight: 500;
  width: 100%;
  border: 1px solid #cbcbcb;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d3d3d3;
}
.separator::before {
  margin-right: 0.25em;
}
.separator::after {
  margin-left: 0.25em;
}
</style>

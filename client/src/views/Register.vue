<template>
  <div class="register">
    <div class="row p-5">
      <div class="col-md-7">
        <div class="bg-only"></div>
      </div>
      <div class="col-md p-0">
        <div class="card d-block mx-auto form-register shadow">
          <div class="register-header">
            <p class="title-register">Create New Account</p>
            <p class="subtitle-register text-muted">
              Already Have an Account ?
              <router-link to="/login">
                <b class="text-success">Login Here</b>
              </router-link>
            </p>
          </div>
          <button class="btn btn-light btn-google mt-2">Google</button>
          <div class="separator my-3">
            <small class="text-muted">Or Register With</small>
          </div>
          <form>
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                autocomplete="off"
                v-model="name"
              />
              <small id="emailHelp" class="form-text text-muted"
                >Example : Jhon Mayer</small
              >
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                autocomplete="off"
                v-model="email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >Example : example@mail.com</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
              />
            </div>
            <button
              class="btn btn-success btn-register mb-3"
              @click.prevent="register"
            >
              Regitster
            </button>
          </form>
          <p align="center">
            <small class="text-muted">
              Registering, you agree that you've read and accepted our
              <u class="text-success">User Agreement</u>, you're at least 18
              years old, and you consent to our
              <u class="text-success">Privacy Notice</u> and receiving marketing
              communications from us.
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      axios
        .post('http://35.185.188.169:3000/users/register', {
          full_name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Registered'
          })
          localStorage.setItem('token', data.token)
          this.$store.state.isLogin = true
          this.$router.push('/')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Uuuppss...',
            text: response.data
          })
        })
    }
  }
}
</script>

<style scoped>
.register {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 94vh;
}
.bg-only {
  width: 100%;
  height: 100%;
  background-image: url('../assets/bg-regist.svg');
  background-size: 75%;
  background-position: center;
  background-repeat: no-repeat;
}
.form-register {
  width: 80%;
  padding: 20px;
  border-radius: 12px;
}
.title-register {
  font-size: 22px;
  text-align: center;
  margin-bottom: 5px;
}
.subtitle-register {
  font-size: 14px;
  text-align: center;
}
.subtitle-register a:hover {
  text-decoration: none;
}
.btn-register {
  width: 100%;
  font-weight: 600;
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
.btn-google {
  font-size: 1.1em;
  font-weight: 500;
  width: 100%;
  border: 1px solid #cbcbcb;
}
</style>

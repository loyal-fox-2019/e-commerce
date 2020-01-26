<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-container>
      <b-navbar-brand><router-link to="/" id="brand">DoReMi</router-link></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        </b-navbar-nav>

        <!-- modal signup -->
        <b-modal
        id="modal-1"
        size="md"
        title="Form Signup"
        hide-footer
        ref="my-modal"
        header-bg-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        header-text-variant="dark">
          <b-form @submit.prevent="signup">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                type="email"
                required
                placeholder="Enter email"
                v-model="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                required
                placeholder="Enter First Name"
                v-model="first_name"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
              <b-form-input
                id="input-3"
                type="text"
                required
                placeholder="Enter Last Name"
                v-model="last_name"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="Address Name:" label-for="input-4">
              <b-form-input
                id="input-4"
                type="text"
                required
                placeholder="Enter Address"
                v-model="address"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Password:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                required
                placeholder="Enter Password"
                v-model="password"
              ></b-form-input>
            </b-form-group>
            <b-button variant="light" type="submit" v-if="!admin">SignUp</b-button>
            <b-button variant="light" type="submit" v-if="admin">Add Admin</b-button>
          </b-form>
        </b-modal>

        <!-- modal signin -->
        <b-modal id="modal-2"
        size="md"
        title="Form Signin"
        hide-footer
        ref="my-modal"
        header-bg-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        header-text-variant="dark">
          <b-form @submit.prevent="signin">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                type="email"
                required
                placeholder="Enter email"
                v-model="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Password:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                required
                placeholder="Enter Password"
                v-model="password"
              ></b-form-input>
            </b-form-group>
            <b-button variant="light" type="submit">Signin</b-button>
          </b-form>
        </b-modal>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="searchItem">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <router-link to="/checkout"><i class="fas fa-shopping-cart" id="carts"></i></router-link>
          <b-button variant="dark" class="ml-3" size="sm" v-if="!login" @click="logout">Logout</b-button>
          <b-button variant="dark" class="ml-3" size="sm" v-if="admin" @click="board">Admin</b-button>
          <b-button variant="dark" class="ml-3" size="sm" v-if="admin" v-b-modal.modal-1>Add New Admin</b-button>
            <b-dropdown text="Account" variant="outline-dark" class="m-2" v-if="login">
            <b-dropdown-item><b-button v-b-modal.modal-1 variant="dark"  size="sm">Signup</b-button></b-dropdown-item>
            <b-dropdown-item><b-button v-b-modal.modal-2 variant="dark"  size="sm">Signin</b-button></b-dropdown-item>
            <b-dropdown-item><b-button @click="$bvModal.show('modal-3')" variant="dark" size="sm">Admin</b-button></b-dropdown-item>
          </b-dropdown>
          <!-- modal signin admin -->
          <b-modal id="modal-3"
        size="md"
        title="Form Signin"
        hide-footer
        ref="my-modal"
        header-bg-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        header-text-variant="dark">
          <b-form @submit.prevent="signinadmin">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                type="email"
                required
                placeholder="Enter email"
                v-model="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Password:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                required
                placeholder="Enter Password"
                v-model="password"
              ></b-form-input>
            </b-form-group>
            <b-button variant="light" type="submit">Signin Admin</b-button>
          </b-form>
        </b-modal>
        </b-navbar-nav>
      </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'
export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      address: '',
      login: true,
      search: '',
      admin: false
    }
  },
  methods: {
    signup: function () {
      let tmp = this
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        address: this.address
      }
      if (this.admin === false) {
        axios({
          url: 'http://localhost:3000/users/signup',
          method: 'POST',
          data: data
        })
          .then((data) => {
            localStorage.setItem('token', data.data.token)
            tmp.login = false
            this.$refs['my-modal'].hide()
            Swal.fire('Good Job!', 'Success Created Account', 'success')
          })
          .catch((fail) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email Already Taken!'
            })
          })
      } else {
        axios({
          url: 'http://localhost:3000/users/signup/admin',
          method: 'POST',
          data: data,
          headers: { token: localStorage.getItem('token') }
        })
          .then((data) => {
            localStorage.setItem('token', data.data.token)
            this.$refs['my-modal'].hide()
            Swal.fire('Good Job!', 'Success Created Account', 'success')
          })
          .catch((fail) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email Already Taken!'
            })
          })
      }
    },
    searchItem: function () {
      router.push('/' + this.search)
    },
    board: function () {
      router.push('/admin')
    },
    signinadmin: function () {
      let tmp = this
      let data = {
        password: this.password,
        email: this.email
      }
      axios({
        url: 'http://localhost:3000/users/admin',
        method: 'POST',
        data: data
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token)
          tmp.login = false
          this.$refs['my-modal'].hide()
          Swal.fire('Good Job!', 'Signin Success', 'success')
          router.push('/admin')
          this.admin = true
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Email/Password!'
          })
        })
    },
    signin: function () {
      let tmp = this
      let data = {
        password: this.password,
        email: this.email
      }
      axios({
        url: 'http://localhost:3000/users/signin',
        method: 'POST',
        data: data
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token)
          tmp.login = false
          this.$refs['my-modal'].hide()
          Swal.fire('Good Job!', 'Signin Success', 'success')
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Email/Password!'
          })
        })
    },
    logout: function () {
      localStorage.clear()
      this.login = true
      this.admin = false
      router.push('/')
    }
  }
}
</script>

<style>
#carts {
  color: black;
  position: absolute;
  font-size: 25px;
  float: right;
  right: 320px;
  top: 15px
}
#carts:hover{
  cursor: pointer;
  transform: scale(1.2);
  color: green;
  transition: 500ms
}

#brand{
  text-decoration: none;
  color: black
}
</style>

<template>
  <div class="admin-login pt-3 pb-5 px-5">
    <h3 align="center" class="mb-2">Admin Panel</h3>
    <div v-if="!this.$store.adminLogin">
      <div class="card form-admin d-block mx-auto">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="example@mail.com"
            autocomplete="off"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            autocomplete="off"
            v-model="password"
          />
        </div>
        <button class="btn btn-success submit-admin" @click.prevent="login">
          Login
        </button>
      </div>
    </div>
    <router-view></router-view>
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
      if (this.email === '' || this.password === '') {
        Swal.fire({
          icon: 'warning',
          title: 'Upps',
          text: 'Email / Password cannot be Null'
        })
      } else {
        axios
          .post('http://35.185.188.169:3000/users/admin', {
            email: this.email,
            password: this.password
          })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            this.$router.push('/admin/cpanel')
            this.$store.adminLogin = true
            this.email = ''
            this.password = ''
          })
          .catch(({ response }) => {
            Swal.fire({
              icon: 'error',
              text: response.data.message
            })
          })
      }
    }
  }
}
</script>

<style>
.admin-login {
  min-height: 94vh;
}
.form-admin {
  width: 35%;
  padding: 20px;
}
.submit-admin {
  width: 100%;
}
</style>

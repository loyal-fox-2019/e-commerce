<template>
  <div>
    <!-- Register Form -->
    <div id="register-form">
      <form>
        <h1 class="text-center mb-2">Register</h1>
        <div class="form-group">
          <label for="register-name">Full Name</label>
          <input
            type="text"
            class="form-control text-center"
            id="register-name"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label for="register-email">Email address</label>
          <input
            type="email"
            class="form-control text-center"
            id="register-email"
            v-model="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control text-center"
            id="register-password"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary mb-3"
          @click.prevent="register"
        >
          Register</button
        ><br />
        <h5>
          Already have an account?
          <span v-b-modal.modal-1>Login Here</span>
        </h5>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      axios
        .post(`${this.$store.state.baseUrl}/user/register`, data)
        .then(result => {
          localStorage.setItem('token', result.data.token)
          this.$store.commit('CHANGE_STATUS')
          this.$router.push('/')
          Swal.fire('Registration Success', 'Enjoy!', 'success')
          this.$store.dispatch('FETCH_CART')
        })
        .catch(err => {
          console.log(err.response)
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
#register-form {
  border: 2px solid black;
  padding: 50px;
}
span {
  font-weight: 700;
  color: blue;
  cursor: pointer;
}
</style>

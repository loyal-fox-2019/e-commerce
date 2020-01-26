<template>
  <div
    class="flex flex-col h-screen"
    style="background: url('https://picsum.photos/2080/1040?random=4')"
  >
    <form
      class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 my-auto mx-auto"
    >
      <h2 class="text-center text-4xl font-bold mb-5">
        Register
      </h2>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="flex justify-start text-gray-700 text-sm font-bold mb-2"
            for="grid-first-name"
          >
            First Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grid-first-name"
            type="text"
            placeholder=""
            v-model="firstname"
            required
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="flex justify-start text-gray-700 text-sm font-bold mb-2"
            for="grid-last-name"
          >
            Last Name (optional) :
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grid-last-name"
            type="text"
            placeholder=""
            v-model="lastname"
          />
        </div>
      </div>
      <div class="mb-4">
        <label
          class="flex justify-start text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username :
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          v-model="username"
          minlength="6"
          required
        />
      </div>
      <div class="mb-6">
        <label
          class="flex justify-start text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password :
        </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="password"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="flex justify-start text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email :
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="flex justify-start text-gray-700 text-sm font-bold mb-2"
          for="contact"
        >
          Contact :
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="contact"
          type="text"
          placeholder="contact"
          v-model="contact"
        />
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="register"
        >
          Register
        </button>
        <router-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/login"
        >
          Already have an account?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$swal({
        title: 'Register?',
        text: 'Make sure there are no typo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure'
      }).then(result => {
        if (result.value) {
          axios({
            method: 'post',
            url: 'http://localhost:3000/users/register',
            data: {
              firstname: this.firstname,
              lastname: this.lastname,
              username: this.username,
              email: this.email,
              contact: this.contact,
              password: this.password
            }
          })
            .then(({ data }) => {
              // eslint-disable-next-line
              console.log(data)
              localStorage.setItem('token', data.token)
              this.$store.state.isLoggedIn = true
              this.$router.replace('/')
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log(err)
            })
          return this.$swal('Success', 'Successfully registered', 'success')
        }
      })
    }
  }
}
</script>

<style scoped></style>

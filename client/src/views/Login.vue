<template>
  <div
    class="flex flex-col h-screen"
    style="background: url('https://picsum.photos/2080/1040?random=2')"
  >
    <form
      class="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 my-auto mx-auto"
    >
      <h2 class="text-center text-4xl font-bold mb-5">Login</h2>
      <div class="mb-4">
        <label
          class="flex justify-start text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username or Email :
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          v-model="target"
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
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="login"
        >
          Sign In
        </button>
        <router-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/register"
        >
          Register Here
        </router-link>
      </div>

      <div class="flex justify-center mt-4">
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Sign in with
          <i class="fab fa-google mx-1"></i>
          Google
        </g-signin-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      target: '',
      password: '',
      googleSignInParams: {
        client_id:
          '265637229228-16b93b2vog9isvsfl8ast03ffh66f8ht.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: this.$baseUrl + '/users/login',
        data: {
          target: this.target,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.$store.state.isLoggedIn = true
          this.$router.replace('/')
        })
        // eslint-disable-next-line
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Username atau password salah!'
          })
        })
    },
    onSignInSuccess(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      const token = {
        idToken: idToken
      }
      axios
        .post(this.$baseUrl + '/users/g-sign-in', token)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('platform', data.platform)
          localStorage.setItem('username', data.username)
          this.$store.state.isLoggedIn = true
          this.$router.replace('/')
        })
        // eslint-disable-next-line
        .catch(function(error) {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Username atau password salah!'
          })
        })
    },
    // eslint-disable-next-line
    onSignInError(error) {
      this.$swal({
        icon: 'error',
        title: 'Error',
        text: 'Username atau password salah!'
      })
    }
  }
}
</script>

<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 1vh 1rem;
  border-radius: 1vw;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

.g-signin-button:hover {
  background-color: green;
}

.g-signin-button:active {
  background-color: blue;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>

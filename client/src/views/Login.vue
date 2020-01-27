<template>
  <div class="container mx-auto h-screen flex">
    <div class="mx-auto my-24 w-full max-w-xs">
      <h4 class="text-center p-4 font-bold text-gray-700">Log in to your account</h4>
      <form
        @submit.prevent="submitLogin"
        @keyup.enter="submitLogin"
        class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            id="username"
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="example@mail.com">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            autocomplete="on"
            placeholder="******">
        </div>
        <div class="flex-col items-center justify-between">
          <button
            @click.prevent="submitLogin"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="submit">
            Log In
          </button>
        </div>
        <div class="flex items-center mt-4">
          <span class="mx-auto text-sm text-gray-500">
            Don't have an account?
            <router-link
              to="/register"
              class="text-blue-500 hover:text-blue-900">
              Register
            </router-link>
          </span>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2019 Deprak. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }

  }
}
</script>

<style>

</style>
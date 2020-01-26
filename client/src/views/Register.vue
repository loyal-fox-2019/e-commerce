<template>
  <div class="vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div class="h-screen">
      <div class="flex items-center justify-center h-full">
        <div class="border border-red-900 px-5 py-2 rounded-sm">
          <h1
            class="text-center text-red-900 mb-10 text-3xl mt-0 font-hairline"
          >
            Register Here!
          </h1>
          <form class="w-full max-w-sm" @submit.prevent="register">
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Username
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-900"
                  id="inline-full-name"
                  type="text"
                  placeholder="Your username"
                  v-model="username"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Email
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-900"
                  id="inline-full-name"
                  type="email"
                  placeholder="Your email"
                  v-model="email"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-username"
                >
                  Password
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-900"
                  id="inline-username"
                  :type="checked ? 'text' : 'password'"
                  placeholder="******************"
                  v-model="password"
                />
              </div>
              <input type="checkbox" v-model="checked" />
            </div>
            <div class="md:flex md:items-center">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button
                  class="shadow bg-red-900 hover:bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Register',
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
      checked: false,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  methods: {
    register() {
      const vm = this
      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password,
        vm,
      })
    },
  },
  components: { Loading },
}
</script>

<style></style>

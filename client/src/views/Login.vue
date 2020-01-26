<template>
  <div class="vld-parent">
    <div class="h-screen">
      <div class="flex items-center justify-center h-full">
        <div class="border border-red-900 px-5 py-2 rounded-sm">
          <h1
            class="text-center text-red-900 mb-10 text-3xl mt-0 font-hairline"
          >
            Login To Our Website
          </h1>
          <form class="w-full max-w-sm" @submit.prevent="login">
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
                  type="text"
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
                  type="password"
                  placeholder="******************"
                  v-model="password"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="md:flex md:items-center">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button
                  class="shadow bg-red-900 hover:bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
            <div class="flex w-full mt-3 items-center">
              <div class="w-5/12"><hr /></div>
              <div class="w-2/12 text-center">Or</div>
              <div class="w-5/12"><hr /></div>
            </div>
            <div class="third-api block my-3">
              <button
                class="bg-black w-full text-white hover:bg-gray-900 py-2 mb-2"
              >
                <span class="fab fa-github"></span> Continue with Github
              </button>
              <GoogleLogin
                :params="params"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
                class="bg-gray-200 px-4 py-2 w-full hover:bg-gray-300"
                ><span class="fab fa-google"></span> Continue with
                google</GoogleLogin
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import Loading from 'vue-loading-overlay'
import Vue from 'vue'

Vue.use(Loading)

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Login',
  components: {
    Loading: Loading,
  },
  data: function() {
    return {
      params: {
        client_id:
          '379332147243-cl1vsiut4mb3e680cmvqo5em2um9355m.apps.googleusercontent.com',
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      email: '',
      password: '',
    }
  },
  components: {
    GoogleLogin,
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser.getBasicProfile())
    },
    onFailure(err) {
      console.log(err)
      this.$toast.open({
        message: 'Failed to login with google',
        type: 'error',
        position: 'top-right',
      })
    },
    login() {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      })
      const vm = this

      this.$store.dispatch('login_normal', {
        email: this.email,
        password: this.password,
        vm,
        loader,
      })
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
  },
}
</script>

<style></style>

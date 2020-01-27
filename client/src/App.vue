<template>
  <div id="app">
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <router-link to="/" class="font-semibold text-xl tracking-tight hover:text-xl cursor-pointer">E-COMMERCE</router-link>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <router-link to='/add-product' class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Add Product
      </router-link>
      <router-link to="/cart" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Cart
      </router-link>
      <router-link to="/transaction" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Transaction
      </router-link>
      <router-link to='/profile' class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Profile
      </router-link>
    </div>
    <div v-if="isLogin">
      <a @click.prevent="logout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</a>
    </div>
    <div v-else>
      <router-link to='/loginRegister' class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login / Register</router-link>
    </div>
  </div>
</nav>
    <div id="nav" class="text-center">
      <router-link v-if="role==='admin'" to="/admin" >Admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['success','fail','successMessage','failMessage','isLogin']),
    ...mapState('product',['role'])
  },
  methods: {
    ...mapActions('product',['GET_USER']),
    logout() {
      localStorage.removeItem('token')
      this.$store.commit('logout')
      this.$swal.fire({
        icon: 'success',
        title: 'Logout Success',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('isLogin')
      this.GET_USER()
    }
  },
  watch: {
    success: function (newValue) {
      if(newValue){
        this.$swal.fire({
          icon: 'success',
          title: this.successMessage,
          showConfirmButton: false,
          timer: 1500
        })
        this.$store.commit('emptySuccessMessage')
      }
    },
    fail: function (newValue) {
      if(newValue){
        this.$swal.fire({
          icon: 'error',
          title: this.failMessage,
          showConfirmButton: false,
          timer: 1500
        })
        this.$store.commit('emptyFailMessage')
      }
    }
  }
}
</script>

<style src="./assets/tailwind.css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

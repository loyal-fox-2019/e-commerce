<template>
  <div id="nav">
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" v-if="!isLogin" to="/login">Login</router-link>
    <router-link class="nav-link" v-if="!isLogin" to="/register">Register</router-link>
    <router-link class="nav-link" v-if="isLogin" to="/cart">{{cartQuantity}} | Cart</router-link>
    <router-link class="nav-link" v-if="isLogin" to="/transaction">Transaction</router-link>
    <a href="" @click.prevent="logout" class="nav-link" v-if="isLogin" to="/">Logout</a>
  </div>
</template>

<script>
import router from '../router'

export default {
  methods: {
    logout () {
      console.log('logout')
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
      router.push('/login')
    }
  },
  computed: {
    cartQuantity () {
      return this.$store.state.cart.length
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  watch: {
    isLogin (n, o) {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
  #nav {
    background-color: rgb(55, 50, 56);
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #nav a {
    color: #fff;
  }
</style>

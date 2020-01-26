<template>
  <div id="nav">
    <b-nav>
      <b-nav-item to='/home' v-if='isLogin && !isAdmin' class='mr-auto'>
        Home
      </b-nav-item>
      <b-nav-item to='/login' v-if='!isLogin' class='ml-auto'>
        My Account
      </b-nav-item>
      <b-nav-item to='/transaction' v-if='isLogin' class='ml-auto'>Transaction</b-nav-item>
      <b-nav-item to='/items' v-if='isLogin && !isAdmin'>My Item</b-nav-item>
      <b-nav-item to='/cart' v-if='isLogin && !isAdmin'>My Cart</b-nav-item>
      <b-nav-item v-if='isLogin' @click='logout'>Logout</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {

  name: 'NavigationBar',

  data () {
    return {

    }
  },
  methods: {
    logout(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      this.$store.commit('logout')
      this.$router.push('/')
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin 
    },
    isAdmin(){
      return this.$store.state.isAdmin
    }
  }
}
</script>

<style scoped>
</style>
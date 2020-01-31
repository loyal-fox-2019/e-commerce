<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" class="shadow">
    <router-link to="/"><b-navbar-brand><sup><img src="../assets/images.png" style="height:3vh;"></sup> L Shop <sup><img src="../assets/input_bpad.png" style="height:3vh;"></sup></b-navbar-brand></router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <AddProduct v-if="$store.state.isAdmin"></AddProduct>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0 mr-4" type="submit">Search</b-button>
        </b-nav-form>
        <b-nav-item href="#" v-if="this.$store.state.isLogin" @click="toCart"><i class="fas fa-shopping-cart"></i><sup v-if="$store.state.cartItems.length!==0">{{$store.state.cartItems.length}}</sup></b-nav-item>
        <SignInButton v-if="!this.$store.state.isLogin"></SignInButton>
        <b-nav-item-dropdown right v-if="this.$store.state.isLogin">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import SignInButton from '../components/SignInButton'
import AddProduct from '../components/AddProduct'
export default {
  name: 'NavBar',
  components: {
    SignInButton,
    AddProduct
  },
  methods: {
    logout () {
      this.$store.commit('SET_LOGOUT')
    },
    toCart () {
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>

</style>

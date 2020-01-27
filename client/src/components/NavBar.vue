<template>
    <b-navbar class="navBar" toggleable="lg" type="dark" variant="dark">

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"><router-link to="/categories" class="routeLink">Categories</router-link></b-nav-item>
          <b-nav-item href="#"><router-link to="/admin" class="routeLink">Admin</router-link></b-nav-item>

        </b-navbar-nav>

         <b-navbar-brand class="d-block mx-auto">
        <router-link to="/">
        <div id="brandTitle">
          <img id="shopLogo" src="../assets/shopLogo.png">
          L Shop
        </div>
        </router-link>
      </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <SignInButton v-if="!logStatus" @justLoggedIn="passLogin($event)"></SignInButton>
          <b-nav-item href="#"><router-link to="/cart" v-if="logStatus" class="routeLink"><i class="fas fa-shopping-cart"></i></router-link></b-nav-item>
          <b-nav-item-dropdown right v-if="logStatus">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="passLogout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import SignInButton from './SignInButton.vue'

export default {
  name: 'NavBar',
  components: {
    SignInButton
  },
  props: [
    'logStatus'
  ],
  methods: {
    passLogin (event) {
      this.$emit('loginPassed', event)
    },
    passLogout () {
      this.$emit('logoutPassed', true)
    }
  }
}
</script>

<style scoped>
  #shopLogo {
    height: 5vh;
  }
  .navBar {
    height: 6vh;
    box-shadow: 0px 1px 100px 0px rgba(255, 167, 4, 0.75);
  }
  #brandTitle {
    height: 6vh;
    color:#FFD300;
  }
  .custom-nav-link {
    height: 6vh;
    color:#FFD300;
    font-size: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1%;
  }
  .custom-nav-link:hover {
    color: #947c02;
  }
  .routeLink {
    color: #FFD300;
  }
  .routeLink:hover {
    color: #947c02;
  }
</style>

<template>
  <div>
    <b-navbar toggleable="md" type="light" class="navbar-section px-5">
      <router-link to="/" class="nav-brand">
        <img src="../assets/brand-logo.png" alt />
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link to="/login">
            <a
              class="btn btn-outline-success btn-navbar mr-3 text-success"
              v-if="!$store.state.isLogin"
              >Login</a
            >
          </router-link>
          <router-link to="/register">
            <a
              class="btn btn-success btn-navbar mr-3 text-light"
              v-if="!$store.state.isLogin"
              >Register</a
            >
          </router-link>
          <b-nav-item-dropdown class="mr-4" v-if="$store.state.isLogin">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              User
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <router-link to="/cart" v-if="$store.state.isLogin">
            <i class="fas fa-shopping-cart cart-icon"></i>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    checkStorage() {
      if (localStorage.getItem('token')) {
        this.$store.state.isLogin = true
      } else {
        this.$store.state.isLogin = false
      }
    },
    logout() {
      localStorage.clear()
      this.$store.state.isLogin = false
    }
  },
  created() {
    this.checkStorage()
  }
}
</script>

<style scoped>
.navbar-section {
  background-color: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(200, 200, 200, 0.75);
}
.btn-navbar {
  border-radius: 7px;
  padding: auto 16px!Important;
  font-weight: 700;
}
.nav-brand img {
  height: 45px;
}
.nav-brand:hover {
  text-decoration: none;
}
.cart-icon {
  color: #5cb85c;
  font-size: 25px;
  /* margin-top: 8px; */
  padding: 7px 2px;
}
.cart-icon:hover {
  color: #5cb85c;
  background-color: #f1f1f1;
}
</style>

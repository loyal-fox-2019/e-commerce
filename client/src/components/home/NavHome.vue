<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light shadow-sm bg-white">
      <router-link class="navbar-brand" to="/">Shop </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <template v-if="!$store.state.isLogin">
            <Login />
            <Register />
          </template>
          <template v-else>
            <router-link
              type="button"
              class="btn btn-primary"
              v-if="$store.state.isLogin.role == 'Admin'"
              to="/admin"
            >
              Go to dashboard
            </router-link>
            <router-link
              type="button"
              class="btn btn-primary"
              v-if="$store.state.isLogin.role !== 'Admin'"
              to="/clientarea"
            >
              Go to carts
            </router-link>
            <button type="button" class="btn ml-1 btn-danger" @click="$store.dispatch('logout')">
              Logout
            </button>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import Login from './Login.vue';
import Register from './Register.vue';

export default {
  components: {
    Login,
    Register,
  },
};
</script>
<style scoped>
.navbar-brand {
  font-variant: petite-caps;
}
</style>

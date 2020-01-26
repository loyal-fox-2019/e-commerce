<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: rgba(151, 151, 151, 0.418);"
  >
    <router-link
      class="navbar-brand font-weight-bold"
      style="color: rgb(48, 255, 29); text-shadow: 2px 2px 5px black;"
      to="/"
    >Tokopend</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto"></ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div class="icon mt-2">
        <h5>
          <router-link to="/cart">
            <i class="fas fa-shopping-cart mr-4 ml-4"></i>
          </router-link>
          <i class="fas fa-envelope mr-4"></i>
          <i class="fas fa-bell mr-4"></i>
        </h5>
      </div>
      <div v-if="!isLogin">
        <router-link to="/account">
          <button type="button" class="btn btn-danger">Account</button>
        </router-link>
      </div>
      <div v-if="isLogin">
        <router-link to="/">
          <button @click="isLogout" type="button" class="btn btn-danger">Logout</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true;
    }
  },
  methods: {
    isLogout() {
      localStorage.clear();
      this.isLogin = false;
    }
  }
};
</script>

<style>
</style>
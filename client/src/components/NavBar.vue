<template>
  <div>
    <b-navbar toggleable="md" type="light" class="navbar-section">
      <router-link to="/" class="nav-brand"
        ><img src="../assets/brand-logo.png" alt=""
      /></router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link to="/login">
            <a class="btn btn-outline-success btn-navbar mr-3 text-success"
              >Login</a
            >
          </router-link>
          <router-link to="/register">
            <a class="btn btn-success btn-navbar mr-3 text-light">Register</a>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {}
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
</style>

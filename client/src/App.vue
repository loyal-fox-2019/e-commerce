<template>
  <div id="app">
    <nav class="navbar navbar-light shadow-sm">
      <router-link to="/" class="navbar-brand">
        <img src="./assets/hires-tokopedia-logo.png" height="32" alt="logo">
      </router-link>
      <div class="login-register">
        <router-link to="/login" class="btn btn-login">Masuk</router-link>
        <router-link to="/register" class="btn btn-register">Daftar</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
.btn:hover {
  color:unset;
}
.btn-login {
  border-color: rgb(3, 172, 14);
  color: rgb(3, 172, 14);
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 18px;
  margin-right: 8px;
}
.btn-register {
  background-color: rgb(3, 172, 14);
  border-color: rgb(3, 172, 14);
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 18px;
}
</style>

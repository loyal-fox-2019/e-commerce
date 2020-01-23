<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/loginregister">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    if(localStorage.getItem('token')){
      this.$router.push('/')
    }
    else {
      this.$router.push('/loginregister')
    }
  }
}
</script>

<style>
*{
  font-family: sans-serif
}
</style>

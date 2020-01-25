<template>
  <div id="app">
    <router-view/>
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

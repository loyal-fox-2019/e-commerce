<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
    }
  },
  methods: {

  },
  created(){
    if (localStorage.getItem('access_token') && localStorage.getItem('username')){
      this.$store.commit('login', localStorage.getItem('username'))
    }
    else {
      this.$router.push('/').catch(() => {})
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row{
  width: 100vw;
}
</style>



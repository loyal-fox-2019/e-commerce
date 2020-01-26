<template>
  <div>
    <NavigationBar />
    <img src="../assets/landing-logo.svg" @click='$router.push("/login")'>
    <h1 class="text-center">Welcome to VueCommerce</h1>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {

  name: 'LandingPage',
  components: {
    NavigationBar
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created(){
  }
}
</script>

<style lang="css" scoped>
img{
  width: 50%;
  display: block;
  margin: auto;
}
</style>
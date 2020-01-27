<template>
  <div id="app">
    <b-container>
      <b-row>
        <NavBar style="width: 100%"/>
        <CarouselItem v-if="carouselDisplay" />
        <router-view/>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import CarouselItem from '@/components/CarouselItem.vue'

export default {
  data () {
    return {
      carouselDisplay: true
    }
  },
  components: {
    NavBar,
    CarouselItem
  },
  methods: {
    initiate () {
      this.$store.dispatch('FETCH_PRODUCTS')
      if (localStorage.getItem('token')) {
        this.$store.dispatch('FETCH_CART')
        this.$store.dispatch('FETCH_TRANSACTION')
        this.$store.commit('SET_ISLOGIN', true)
      }
    }
  },
  watch: {
    '$route': function () {
      if (this.$route.name === 'home') {
        this.carouselDisplay = true
      } else {
        this.carouselDisplay = false
      }
    }
  },
  created () {
    this.initiate()
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
  /* background-color: #3e3e3e; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

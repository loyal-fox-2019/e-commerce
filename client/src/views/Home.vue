<template>
  <div class="home">

    <carousell></carousell>

    <div class="container">
      <div class="row">
        <div class="col-2">
          <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a @click="allProducts" class="nav-link btn-dark text-white mb-3 active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
            <a @click="myProducts" class="nav-link btn-dark text-white mb-3" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">My Clothes</a>
          </div>
        </div>
        <div class="col-10">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <circularbutton></circularbutton>

  </div>
</template>

<script>
// @ is an alias to /src
import card from "../components/Card"
import carousell from "../components/Carousell"
import circularbutton from "../components/Button"
import axios from "axios"

export default {
  name: 'home',
  components: {
    carousell,
    circularbutton,
  },
  data(){
    return {
      products : [],
    }
  },
  methods : {
    myProducts(){
      this.$router.push('/myproducts')
      },
    allProducts(){
      this.$router.push('/')
    },
  },
  created(){
    // this.fetchData()
  }
}
</script>
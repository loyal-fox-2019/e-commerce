<template>
  <div class="home">

    <carousell></carousell>

    <div class="container">
      <div class="row">
        <div class="col-2">
          <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a class="nav-link btn-dark text-white mb-3 active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
            <a class="nav-link btn-dark text-white mb-3" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Men's</a>
            <a class="nav-link btn-dark text-white mb-3" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Woman's</a>
            <a class="nav-link btn-dark text-white mb-3" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Children</a>
          </div>
        </div>
        <div class="col-10">
          <div class="row">
            <card v-for="(product,i) in products" :key="i" :product="product" class='m-3'></card>
          </div>
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
    card,
    carousell,
    circularbutton,
  },
  data(){
    return {
      products : []
    }
  },
  created(){
    axios({
      baseURL : "http://localhost:3000",
      url : '/product',
      method : 'get',
      headers : {
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvdmlAbWFpbC5jb20iLCJwYXNzd29yZCI6ImFiY2QiLCJpYXQiOjE1Nzk2MzExOTV9.lGIwmaozjCstDjm6HvDcAuEupGY1PPtSTcFAiTajnz0'
      }
    })
    .then(({data})=>{
      console.log('berhasil get porducts')
      data.forEach(el => {
        this.products.push(el)
      });
    })
  }
}
</script>
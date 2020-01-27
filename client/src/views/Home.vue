<template>
  <div class="home">
    <Slider></Slider>
    <logoSlider></logoSlider>
    <div class="row row-item">
      <div class="col-lg-3" v-for="(product, i) in products" :key ="i">
        <itemCard v-bind:product="product"></itemCard>
      </div>
    </div>
    <footerComp></footerComp>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/navbar.vue';
import Slider from '@/components/slider.vue';
import logoSlider from '@/components/LogoSlider.vue';
import itemCard from '@/components/ItemCard.vue';
import footerComp from '@/components/Footer.vue';
import axios from 'axios';

export default {
  name: 'home',
  components: {
    Navbar,
    Slider,
    logoSlider,
    itemCard,
    footerComp,
  },
  created() {
    this.getProducts();
  },
  data() {
    return {
      products: [],
    }
  },
  props: ['isLoggedIn'],
  methods: {
    getProducts: function() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/product',
      })
      .then(response => {
        this.products = response.data.data.slice(0, 8);
      })
      .catch(error => {
        console.log({error});
      }) 
    }
  }
};
</script>

<style>
.row-item {
  padding: 0 20px;
  margin: 0 !important;
}
</style>

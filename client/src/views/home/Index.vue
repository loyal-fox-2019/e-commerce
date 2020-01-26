<template>
  <div>
    <NavHome />
    <div id="main">
      <CarouselHome />

      <div class="container">
        <div>
          <h2 class="title-item mb-2">
            Product list
          </h2>
        </div>
        <div class="row">
          <div class="col-6 col-lg-3 col-md-3 mb-3" v-for="(item, i) in products" :key="i">
            <CardProduct />
          </div>
        </div>
      </div>
    </div>
    <FooterHome />
  </div>
</template>
<script>
import NavHome from '@/components/home/NavHome.vue';
import CarouselHome from '@/components/home/CarouselHome.vue';
import CardProduct from '@/components/home/CardProduct.vue';
import FooterHome from '@/components/home/FooterHome.vue';

export default {
  name: 'Home',
  components: {
    NavHome,
    CarouselHome,
    CardProduct,
    FooterHome,
  },
  data() {
    return {
      products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
};
</script>

<style scoped>
#main {
  margin-top: 70px;
}
.title-item {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: 'Nunito Sans', -apple-system, sans-serif;
  font-size: 1.7142857142857142rem;
  line-height: 30px;
  color: rgba(49, 53, 59, 0.96);
  -webkit-text-decoration: initial;
  text-decoration: initial;
  font-size: 20px;
  margin: 0;
}
</style>

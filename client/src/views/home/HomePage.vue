<template>
  <div>
    <CarouselHome />

    <div class="container">
      <div>
        <h2 class="title-item mb-2">
          Product list
        </h2>
      </div>
      <div class="row">
        <div class="col-6 col-lg-3 col-md-3 mb-3" v-for="(product, i) in products" :key="i">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CarouselHome from '@/components/home/CarouselHome.vue';
import CardProduct from '@/components/home/CardProduct.vue';

export default {
  name: 'HomePage',
  components: {
    CarouselHome,
    CardProduct,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('Product', ['products']),
  },
  methods: {
    ...mapActions('Product', ['getProducts']),
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="css" scoped></style>

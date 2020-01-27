<template>
  <div class="home">
    <div v-if="isLoading">
      <loadingPage></loadingPage>
    </div>
    <div v-else>
      <products :products="products"></products>
    </div>
  </div>
</template>

<script>
import products from '../components/Products'
import loadingPage from '../components/loadingPage'
import { mapActions,mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    products,
    loadingPage
  },
  methods: {
    ...mapActions('product',['GET_PRODUCTS'])
  },
  computed: {
    ...mapState('product',{
      product:'products'
    }),
    ...mapState(['isLoading']),
    products() {
      return this.product
    }
  },
  created() {
    this.GET_PRODUCTS()
  }
}
</script>

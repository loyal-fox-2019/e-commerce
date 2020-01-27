<template>
  <div class="profile">
      <div v-if="isLoading">
          <loadingPage></loadingPage>
      </div>
      <div v-else>
        <!-- <div v-if="productss.length > 0" class="text-xl">{{productss[0].seller.name}}'s Products</div> -->
        <product :products="productss" :profile="true"></product>
      </div>
  </div>
</template>

<script>
import product from '../components/Products'
import loadingPage from '../components/loadingPage'
import { mapActions,mapState } from 'vuex'

export default {
    components: {
        product,
        loadingPage
    },
    methods: {
        ...mapActions('product',['GET_USER_PRODUCTS'])
    },
    computed: {
        ...mapState(['isLoading']),
        ...mapState('product',{
            products:'userProducts'
        }),
        productss() {
            return this.products
        }
    },
    created() {
        this.GET_USER_PRODUCTS()
    }
}
</script>

<style>

</style>
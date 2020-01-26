<template>
  <div>
    <NavigationBar />
    <h4 class="text-center">Your Items</h4>
    <h2 class='text-center mt-5' v-if='products.length == 0'>
      You don't have any item on sale
    </h2>
    <h4 class="text-center">
      <router-link to='new' class='btn btn-primary my-3'>
        Post new item
      </router-link>
    </h4>
    <div class="row">
      <ProductCard v-for='product in products' :key='product._id' 
        :productData='product' @refresh='getProducts' :owner='true'
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import NavigationBar from '@/components/NavigationBar'

export default {

  name: 'MyItem',
  components: {
    ProductCard,
    NavigationBar,
  },
  data () {
    return {
      products: []
    }
  },
  created(){
    this.getProducts()
  },
  methods: {
    getProducts(){
      this.$store.dispatch('getUserProducts')
      .then(() => {
        this.products = this.$store.state.userProducts
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
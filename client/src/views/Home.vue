<template>
  <div class="home">
    <NavigationBar />
    <h4 class="text-center">Products to buy</h4>
    <div class="row">
      <ProductCard v-for='product in products' :key='product.id' :productData='product' :owner='false'/>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'home',
  components: {
    ProductCard,
    NavigationBar
  },
  data(){
    return {
      products: []
    }
  },
  methods: {
  },
  created(){
    this.$axios({
      method: 'GET',
      url: '/products/othersItem',
      headers: {
        token: localStorage.getItem('access_token')
      }
    })
      .then(({data}) => {
        this.products = data
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          html: err.response.data.message
        })
      })
  }
}
</script>

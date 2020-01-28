<template>
  <div>
    <NavigationBar />
    <h4 class="text-center">Your Cart</h4>
    <h2 class='text-center mt-5' v-if='products.length == 0'>
      You don't have any item on cart
    </h2>
    <h4 class="text-center">
      <router-link to='/home' class='btn btn-primary my-3'>
        Browse Item
      </router-link>
      <b-button class='btn btn-success ml-3' v-if='products.length != 0' @click='checkout'>
        Checkout
      </b-button>
    </h4>
    <h5 class="text-center">Total price in your cart Rp. {{totalPrice | separator}}</h5>
    <div class="row">
      <ProductCard v-for='product in products' :key='product._id' 
        :productData='product' :owner='false' :cart='true'
      />
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {

  name: 'MyCart',
  components: {
    NavigationBar,
    ProductCard
  },
  data () {
    return {

    }
  },
  created(){
    this.$store.dispatch('getUserCart')
  },
  computed: {
    products(){
      return this.$store.state.userCart
    },
    totalPrice(){
      let total = 0
      for (let product of this.products){
        total += (product.price * product.stock)
      }
      return total
    }
  },
  methods: {
    checkout(){
      this.$axios({
        method: 'POST',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.$swal.fire({
            icon: 'success',
            html: data.message
          })
          this.$store.dispatch('getUserCart')

        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    }
  },
  filters: {
    separator(number){
      let result = ''
      String(number).split('').reverse().forEach((e, i) => {
        if (i % 3 == 0 && i != 0){
          result += '.'
        }
        result += e
      })
      return result.split('').reverse().join('')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
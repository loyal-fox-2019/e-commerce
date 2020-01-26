<template>
  <div>
    <NavigationBar />
    <h4 class="mt-1">Edit Product</h4>
    <router-view class='mt-3' :productDetail='product'></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
export default {

  name: 'EditItem',
  components: {
    NavigationBar
  },
  data () {
    return {
      product: {}
    }
  },
  created(){
    this.getProductDetail()
  },
  methods: {
    getProductDetail(){
      this.$axios({
        method: 'GET',
        url: `/products/${this.$route.params.id}`
      })
        .then(({data}) => {
          this.product = data
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
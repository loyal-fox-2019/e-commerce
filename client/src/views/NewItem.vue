<template>
  <div>
    <NavigationBar />
    <h4 class="mt-1">Post New Product</h4>
    <ProductForm class='mt-3'/>
  </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue'
import NavigationBar from '@/components/NavigationBar.vue'

export default {

  name: 'NewItem',
  components: {
    ProductForm,
    NavigationBar
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
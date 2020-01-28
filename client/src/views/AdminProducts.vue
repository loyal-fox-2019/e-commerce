<template>
  <section class="bg-white">
    <div 
      class="container mx-auto flex justify-center items-center flex-wrap pt-2 pb-12">
      <AdminProductDisplay
        v-for="product in products"
        :key="product._id"
        :product="product">
      </AdminProductDisplay>
    </div>
  </section>
</template>

<script>
import AdminProductDisplay from '../components/AdminProductDisplay'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AdminProducts',
  components: {
    AdminProductDisplay
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created () {
    this.fetchProducts()
  },
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style>

</style>
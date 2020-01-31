<template>
  <div class="vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div class="h-48 px-5 pt-16 pb-5">
      <div class="h-full">
        <div>
          <h1
            class="text-6xl font-hairline tracking-wider text-red-900 capitalize"
          >
            Guitar {{ $route.params.guitarType }} Collections
          </h1>
        </div>
        <div class="flex">
          <router-link
            to="./classic"
            class="border border-red-900 text-red-900 py-1 px-2 text-sm font-hairline hover:bg-red-900 hover:text-white rounded-sm"
            :class="{ active: $route.params.guitarType === 'classic' }"
            >Go to classic guitar collections</router-link
          >
          <router-link
            to="./electric"
            class="border border-red-900 text-red-900 py-1 px-2 text-sm font-hairline hover:bg-red-900 hover:text-white rounded-sm ml-2"
            :class="{ active: $route.params.guitarType === 'electric' }"
            >Go to electric guitar collections</router-link
          >
        </div>
      </div>
    </div>
    <div class="flex flex-wrap m-2 justify-around">
      <ProductCard
        v-for="guitar in filteredGuitars"
        :key="guitar._id"
        :guitar="guitar"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Guitar',
  components: { ProductCard, Loading },
  data: function() {
    return {
      filteredGuitars: [],
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(val) {
        this.$store.dispatch('fetch_all_guitars')
        this.filteredGuitars = this.guitars.filter(guitar => {
          return guitar.category == val.params.guitarType
        })
      },
    },
    guitars: {
      immediate: true,
      handler: function(val) {
        this.filteredGuitars = val.filter(guitar => {
          return guitar.category == this.$route.params.guitarType
        })
      },
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    guitars() {
      return this.$store.state.guitars
    },
  },
}
</script>

<style scoped>
.active {
  background-color: #742a2a !important;
  color: white !important;
}
</style>

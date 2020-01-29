<template>
  <div class="flex flex-wrap px-20 pt-12">
     <div class="rounded-lg px-6 mb-10" v-for="item in items" :key="item._id">
        <ItemCard :item="item" />
     </div>
  </div>
</template>

<script>
import axios from '../services/server'
import ItemCard from '../components/ItemCard'

export default {
   name: 'ItemList',

   components: {
      ItemCard
   },

   methods: {
      async fetchItems() {
         try {
            const {data} = await axios.get('/item')
            this.$store.commit('SET_ITEMS', data.items)
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      }
   },

   computed: {
      items() {
         return this.$store.state.items
      }
   },

   created() {
      this.fetchItems()
   }
}
</script>

<style scoped>

</style>
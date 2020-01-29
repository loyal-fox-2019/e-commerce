<template>
   <div class="flex flex-col card rounded-lg cursor-pointer" @click="toItemDetail">
      <img :src="item.image" class="object-cover card-img">
      <div class="bg-clouds p-4">
         <h4 class="text-xl font-semibold text-gray-700">{{item.name}}</h4>
         <div v-html="item.description" class="text-gray-600"></div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'ItemCard',

   props: {
      item: Object
   },

   methods: {
      toItemDetail() {
         this.$router.push({name: 'itemDetail', params: {id: this.item._id}})
      }
   }
}
</script>

<style scoped>
   .card {
      width: 16rem;
      height: 23rem;
      overflow: hidden;
   }
   .card-img {
      width: 16rem;
      height: 10rem;
      /* min-width: 10rem; */
   }
</style>
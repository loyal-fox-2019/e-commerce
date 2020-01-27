<template>
  <router-link :to="{ name: 'product', params: {id: product._id } }">
    <div class="flex-shrink-0 m-6 relative overflow-hidden bg-gray-200 rounded-lg max-w-xs shadow-lg">
      <div class="relative pt-10 px-10 flex items-center justify-center">
        <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
        <img class="relative w-40 h-40 rounded-lg shadow-xl" :src="product.image" alt="">
      </div>
      <div class="relative text-white px-6 pb-6 mt-6">
        <span class="text-left block font-semibold text-base text-gray-800 mb-1">{{ product.name }}</span>
        <div class="flex justify-between">
          <span class="block opacity-75 -mb-1 text-black text-xs">{{ product.brand }}</span>
          <span class="block bg-red-500 rounded-full text-white text-xs font-bold px-1 py-1 leading-none flex items-center">Rp. {{ product.price }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>

<style>

</style>
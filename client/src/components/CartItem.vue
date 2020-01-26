<template>
  <div class="containter w-full mx-auto">
    <div class="border border-gray-300 shadow-md rounded flex p-4 mb-2">
      <router-link to="/store" class="flex justify-center shadow-md rounded">
        <img
          class=" hover:grow hover:shadow-lg w-24 h-24"
          :src="product.productId.image" >
      </router-link>
      <div class="flex flex-col justify-between px-4">
        <span class="text-sm">{{ product.productId.name }}</span>
        <span class="text-sm">Rp. {{ product.productId.price }}</span>
        <span class="text-sm">Amount: {{ product.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['product'],
  created () {
  }
}
</script>

<style>

</style>
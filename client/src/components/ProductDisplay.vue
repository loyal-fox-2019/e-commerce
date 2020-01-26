<template>
  <div class="w-full justify-center md:w-1/3 xl:w-1/4 p-6 flex flex-col">
    <div class="w-56 h-80 mx-auto border border-gray-300 shadow rounded-lg hover:shadow-lg">
      <router-link to="/store" class="flex justify-center">
        <img
          class="hover:grow w-full h-56 rounded p-4 border-b border-gray-300"
          :src="product.image" >
      </router-link>
      <ActionBox :product="product"></ActionBox>
    </div>
  </div>
</template>

<script>
import ActionBox from './ActionBox'
export default {
  name: 'ProductDisplay',
  components: {
    ActionBox,
  },
  props: ['product']
}
</script>

<style>

</style>
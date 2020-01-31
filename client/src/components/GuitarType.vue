<template>
  <div
    class="h-5/12 w-5/12 border border-red-900 relative"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <img :src="imgSrc" />
    <div class="custom-content" v-if="hover">
      <div class="flex justify-center h-full items-center">
        <div class="text-center">
          <p class="text-3xl text-orange-200 tracking-wide">{{ title }}</p>
          <p class="text-xl text-orange-200 tracking-wide mb-10">
            {{ description }}
          </p>
          <router-link
            class="bg-orange-900 rounded py-2 px-4 text-white hover:bg-orange-800 mt-5"
            :to="'/guitars/' + urlTo"
          >
            Go to collections
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuitarType',
  data: function() {
    return {
      hover: false,
    }
  },
  props: ['imgSrc', 'title', 'description', 'urlTo'],
}
</script>

<style scoped>
.custom-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.5);
}
</style>

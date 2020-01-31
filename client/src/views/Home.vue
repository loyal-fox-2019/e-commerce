<template>
  <div>
    <div class="custom-body bg-fixed h-screen">
      <div class="flex items-center h-full">
        <div class="ml-5">
          <p class="text-6xl font-hairline tracking-wider text-red-900">
            Express your emotion through guitar.
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-around py-16">
      <GuitarType
        :imgSrc="
          'https://storage.cloud.google.com/images-bucket-arief/guitar-classic.jpg'
        "
        :title="'Guitar Classic'"
        :description="
          'There’s no hiding behind distortion or effect pedals, it’s just you and your mighty fingers.'
        "
        :urlTo="'classic'"
      />
      <GuitarType
        :imgSrc="
          'https://storage.cloud.google.com/images-bucket-arief/guitar-electric.jpg'
        "
        :title="'Guitar Electric'"
        :description="'Electrify your guitar, distort the world.'"
        :urlTo="'electric'"
      />
    </div>
  </div>
</template>

<script>
import GuitarType from '@/components/GuitarType.vue'

export default {
  name: 'Home',
  components: {
    GuitarType,
  },
  data: function() {
    return {
      hover: false,
    }
  },
}
</script>

<style scoped>
.custom-body {
  background-image: url(../assets/guitar-wallpaper.jpg);
  background-size: cover;
}
</style>

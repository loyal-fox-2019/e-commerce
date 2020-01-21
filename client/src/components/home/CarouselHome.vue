<template>
  <div>
    <vueper-slides
      fractions
      class="no-shadow"
      :visible-slides="3"
      :slide-ratio="1 / 4"
      :dragging-distance="70"
      id="vueperslides"
    >
      <vueper-slide
        v-for="i in 9"
        :key="i"
        :title="i.toString()"
        :image="'https://via.placeholder.com/300'"
        class="m-1"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {
  name: 'CarouselHome',
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped>
#vueperslides {
  margin: auto;
  width: 1200px !important;
}
</style>

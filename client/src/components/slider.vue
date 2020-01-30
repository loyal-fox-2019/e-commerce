<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
    <b-carousel-slide>
        <template v-slot:img>
            <img :src="require('../assets/image/Alap_Jimny.jpg')" alt=""  width="1440" height="650">
        </template>
    </b-carousel-slide>

    <!-- Slides with custom text -->
    <b-carousel-slide>
        <template v-slot:img>
            <img :src="require('../assets/image/Banner_VWS.jpg')" alt=""  width="1440" height="650">
        </template>
    </b-carousel-slide>

    <!-- Slides with image only -->
    <b-carousel-slide>
        <template v-slot:img>
            <img :src="require('../assets/image/Brixton.jpg')" alt=""  width="1440" height="650">
        </template>
    </b-carousel-slide>

    <!-- Slides with img slot -->
    <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
    <b-carousel-slide>
        <template v-slot:img>
            <img :src="require('../assets/image/forgiato1.jpg')" alt=""  width="1440" height="650">
        </template>
    </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide>
            <template v-slot:img>
                <img :src="require('../assets/image/HF_5_Vossen1.jpg')" alt=""  width="1440" height="650">
            </template>
        </b-carousel-slide>
    </b-carousel>
    </div>
</template>

<script>
export default {
    name: 'Slider',
    data() {
        return {
            //gambar : url(../assets/image/Alap_Jimny.jpg),
            slide: 0,
            sliding: null
        };
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
    },
};
</script>

<style>

</style>

<template>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      no-hover-pause="true"
      no-animation
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        img-src="https://storage.googleapis.com/h8-ecommerce-storage2/jedi.jpeg"
        img-width="1024"
        img-height="480"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://storage.googleapis.com/h8-ecommerce-storage2/sekiro.jpeg"
      img-width="1024"
      img-height="480">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://storage.googleapis.com/h8-ecommerce-storage2/halo.jpeg"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide img-src="https://storage.googleapis.com/h8-ecommerce-storage2/mario.jpeg">
      </b-carousel-slide>
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

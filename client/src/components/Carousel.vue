<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="200"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide>
        <template v-slot:img>
            <img class="d-block img-fluid w-100"
                width="1024"
                src="https://picsum.photos/1024/480/?image=52"
                alt="image"
            >
        </template>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide>
        <template v-slot:img>
            <img class="d-block img-fluid w-100 carousel-img"
                width="1024"
                src="https://picsum.photos/1024/480/?image=54"
                alt="image"
            >
        </template>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide>
        <template v-slot:img>
            <img class="d-block img-fluid w-100 carousel-img"
                width="1024"
                src="https://picsum.photos/1024/480/?image=58"
                alt="image"
            >
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100 carousel-img"
            width="1024"
            height="200"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>

<style>
    .carousel-img {
        height: 20vh;
    }
</style>
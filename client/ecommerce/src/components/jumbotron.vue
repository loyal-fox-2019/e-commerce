<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="2300"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="animated jackInTheBox"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        img-src="https://static.wixstatic.com/media/bd2bb6224b204351a7115ba62ee4a49d.jpg/v1/fill/w_1024,h_480,al_c,q_85,usm_0.66_1.00_0.01/bd2bb6224b204351a7115ba62ee4a49d.webp"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://pbs.twimg.com/media/EKfgnLfWsAAW0FG.jpg">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="http://gubukmusik.id.tc/wp-content/uploads/sites/273/2016/10/GITAR-SEMARANG-GUBUK-MUSIK-1024x480.jpg"></b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AeqDb7FWUDF-YrBSZHglByb6qBApczhsQap1SukzfR71XoKg3w&s"
          >
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>
  </div>
</template>

<script>
export default {
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

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
    class="mb-5"
  >
    <b-carousel-slide
      img-src="https://allgoodtales.com/wp-content/uploads/2018/10/Nike-Header-min.jpg"
    ></b-carousel-slide>
    <b-carousel-slide img-src="http://www.zkdok.co.nz/includes/templates/zkdok/images/nike-sneakers.jpg">
    </b-carousel-slide>
    <b-carousel-slide img-src="https://www.a9immobilier.fr/includes/templates/19025hyp/images/banner.jpg"></b-carousel-slide>
  </b-carousel>
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

<style>
</style>

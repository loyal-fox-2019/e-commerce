<template>
  <div>
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        controls="true"
      >
        <b-carousel-slide
          caption="Brass Instrument"
          img-src="https://assets.dci.org/5dd2206d694c8b103767ec86_YBhP16A9yes3IEKmk_W8lOav9aZAdmgq.jpg"
          class="item-carousel"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Battery Instrument"
          img-src="https://assets.dci.org/5dd21dae694c8b0ec052f7c4_mytPgz4z5A8J_6N4qr8rcJlWeA8Dxu2S.jpg"
          class="item-carousel"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="PIT Instrument"
          img-src="https://i.ytimg.com/vi/qbYvYzN45u0/maxresdefault.jpg"
          class="item-carousel"
        ></b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>

<style lang="css" scoped>
#carousel-fade .item-carousel {
  max-height: 50vh;
}
</style>

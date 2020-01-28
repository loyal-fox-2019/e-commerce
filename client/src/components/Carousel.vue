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
      <b-carousel-slide>
        <template v-slot:img>
            <img class="d-block img-fluid w-100"
                src="https://image.shutterstock.com/image-vector/tiny-people-customers-bags-shopping-260nw-1331333954.jpg"
                alt="image"
            >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
            <img class="d-block img-fluid w-100 carousel-img"
                src="https://image.shutterstock.com/image-vector/long-banner-sale-discount-offer-260nw-1334522027.jpg"
                alt="image"
            >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
            <img class="d-block img-fluid w-100 carousel-img"
                src="http://www.ittybittyfashiontruck.com/files/block/bImgURL/size1180x1180/IttyBitty_shop_header.jpg"
                alt="image"
            >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100 carousel-img"
            src="https://images.squarespace-cdn.com/content/v1/539f41eee4b01c7e0bff79af/1510267752384-H8LCEPHW4LRYJ29AJASR/ke17ZwdGBToddI8pDm48kMNvsYmIKFMCqwypomgwzC4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcPqiCb34ugAnC7oXvftqpeEhiUXVe85BYsCz0cw5pb7_TRyiYD8tQNNz7bkao0c5o/skipper-dipper-lbi-shop-header.png"
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

<style scoped>
  img{
      height: 40vh;
  }
</style>
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
      img-height="100"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide>
        <h1>Hello {{firstName}}!</h1>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://www.webnetcreatives.net/wp-content/uploads/2015/02/e-commerce-header.png"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://img.alicdn.com/tfscom/TB1VM5ragFY.1VjSZFnXXcFHXXa.jpg"
            alt="image slot"
          />
        </template>
        >
      </b-carousel-slide>

      <!-- Slides with custom text -->

      <!-- Slides with image only -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://picsum.photos/1024/480/?image=58"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src=" https://d1csarkz8obe9u.cloudfront.net/posterpreviews/blue-student-discounts-email-header-design-template-02bfb5e383249ddd95e3d4beeb8b626a_screen.jpg?ts=1561541735"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      slide: 0,
      sliding: null,
      firstName: ""
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  },
  created() {
    this.firstName = localStorage.getItem("firstName");
  }
};
</script>

<style scoped>
img {
  max-height: 400px;
}
</style>
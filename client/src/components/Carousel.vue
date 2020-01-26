<template>
  <carousel
    :autoplay="true"
    :center="true"
    :loop="true"
    :autoWidth="true"
    :nav="false"
    class="mb-3"
  >
    <div class="img-carousel mx-3">
      <img src="../assets/banner-1.jpg" alt="" />
    </div>
    <div class="img-carousel mx-3">
      <img src="../assets/banner-2.jpg" alt="" />
    </div>
    <div class="img-carousel mx-3">
      <img src="../assets/banner-3.jpeg" alt="" />
    </div>
    <div class="img-carousel mx-3">
      <img src="../assets/banner-4.jpg" alt="" />
    </div>
    <div class="img-carousel mx-3">
      <img src="../assets/banner-5.png" alt="" />
    </div>
  </carousel>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  components: { carousel }
}
</script>

<style>
.img-carousel {
  width: 600px;
  height: 240px;
}
.img-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

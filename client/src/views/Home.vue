<template>
  <div class="home">
    <carouselHome></carouselHome>
    <promotion></promotion>
    <cardItem></cardItem>
  </div>
</template>

<script>
// @ is an alias to /src
import carouselHome from "@/components/carouselHome.vue";
import promotion from "@/components/promotion.vue";
import cardItem from "@/components/cardItem.vue";

export default {
  name: "home",
  components: {
    carouselHome,
    promotion,
    cardItem
  }
};
</script>

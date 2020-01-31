<template>
  <b-col cols="2" class="shadow mx-2 my-2 Pcard pt-2" @click="goToDetails(productDisplay._id)">
      <b-row align-h="center"><img class="cardImg" :src="productDisplay.productImage"></b-row>
      <b-row align-h="center" class="mt-4">{{productDisplay.productName}}</b-row>
      <b-row align-h="center" class="my-4">{{productDisplay.price}}</b-row>
  </b-col>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productDisplay: {
      type: Object
    }
  },
  methods: {
    goToDetails (id) {
      this.$store.commit('SET_DETAILEDPRODUCT', this.productDisplay)
      this.$router.push(`${this.$route.params.category}/product/${id}`)
    }
  }
}
</script>

<style scoped>
.Pcard {
    min-width: 20vw;
    min-height: 40vh;
    border-radius: 15px;
}
.Pcard:hover {
    transform: scale(1.02);
    transition: 1s;
}
.cardImg {
  max-width: 18vw;
  height: 30vh;
}
</style>

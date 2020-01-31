<template>
   <b-row @click="toCategory(categoryData.name)" class="catCards mx-3 shadow" :style="{ backgroundImage: 'url(' + categoryData.bg + ')' }">
    <b-col align-v="center" class="pt-3 catCardsOverlay">{{categoryData.name}}</b-col>
   </b-row>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    categoryData: {
      type: Object
    }
  },
  methods: {
    toCategory (category) {
      this.$router.push(`/${category}`)
    }
  }
}
</script>

<style scoped>
.catCards {
    width: 25vw;
    height: 10vh;
    border-radius: 15px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 50%;
}
.catCardsOverlay {
  background-color: #0000006c;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  opacity: 0;
  cursor: pointer;
}
.catCardsOverlay:hover {
  opacity: 100%;
  transition: 0.5s;
}

</style>

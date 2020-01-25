<template>
  <div class="home">
    <div class="row justify-content-start">
      <CardProduct v-for="i in cardRepeat" :key="i"></CardProduct>
    </div>
  </div>
</template>

<script>
import CardProduct from '../components/CardProduct'
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    CardProduct
  },
  data() {
    return {
      cardRepeat: 22
    }
  }
}
</script>

<style scoped>
.home {
  padding: 30px;
}
</style>

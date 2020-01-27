<template>
  <div id="homeBg">
    <b-container style="margin-top: 1%;width:50%;">
      <h1 style="margin-bottom:4%;">Categories</h1>
      <Categories></Categories>
    </b-container>
  </div>
</template>

<script>
import Categories from '../components/Categories'
export default {
  name: 'categories',
  components: {
    Categories
  },
  props: {
    products: {
      type: Array
    }
  }
}
</script>

<style scoped>
  #homeBg {
    color: #FFD300;
    height: 94vh;
  }
</style>

<template>
  <div id="homeBg">
    <SearchBar></SearchBar>
    <b-container style="margin-top: 1%;width:50%;">
      <h1>Categories</h1>
      <Categories></Categories>
    </b-container>
  </div>
</template>

<script>
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'
export default {
  name: 'categories',
  components: {
    Categories,
    SearchBar
  }
}
</script>

<style scoped>
  #homeBg {
    color: #FFD300;
    height: 94vh;
  }
</style>

<template>
  <div id="app">
  <FrontPage></FrontPage>
  <router-view><router-view>
  </div>
</template>

<script>
import FrontPage from "./views/FrontPage"
export default {
  components: {
    FrontPage
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

html {
  font-family: 'Roboto', sans-serif;
}

.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  background-color: #2d3436;
  color: #dfe6e9;
  padding: 10px; 
  border-radius: 1px;
  display: inline-block;
  letter-spacing: 3.5px;
  transition: all .2s;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px;
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 1px 1px 
}

.btn{
  margin-bottom: 20px;
}

</style>

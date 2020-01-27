<template>
  <div id="app">
    <ul>
      <li><a class="active" href="#home">PusatBantuan</a></li>
      <li><a href="#news">Promo</a></li>
      <li><a href="#contact">MulaiBerjualan</a></li>
      <li><a href="#about">TentangTokowijaya</a></li>
    </ul>
    <div id="mainBar">  
      <router-link to="/">
      <h1 style="
      margin-left: 20px;
      margin-right: 150px;
      width: 50px;
      font-family: Offside, cursive;
      color: rgb(66, 185, 131);
      padding: 0px;">tokowijaya</h1>
      </router-link>
      <b-input-group class="mb-5 col-6">
        <b-form-input
          placeholder="search"
          class="form-control ml-5"
        ></b-form-input>
        <b-input-group-append>
          <b-button><i class="fa fa-search"></i></b-button>
        </b-input-group-append>
      </b-input-group>
          <a style="cursor: pointer;"><i class="fa fa-shopping-cart" style="font-size:24px;margin-top:5px;"></i></a>
          <a style="cursor: pointer;"><i class="fa fa-bell" style="font-size:20px;margin-top:9px;margin-left:30px;"></i></a>
          <a style="margin-top:8px;margin-left:30px;"> | </a>
          <b-img src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg" rounded="circle" alt="Circle image" style="width:30px;height:30px;margin-top:5px;margin-left:20px;"></b-img>
          <a style="margin-top:10px;margin-left:30px;color:black;"><h4>Daniel</h4></a>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #F3F4F5;
}

li {
  float: right;
}

li a {
  display: block;
  color: #9c9c9c;
  text-align: center;
  padding: 5px 5px;
  text-decoration: none;
  font-size: 15px;
  margin-right: 25px; 
  font-family: 'open sans','tahoma',sans-serif;
}

h4{
  font-family: 'open sans','tahoma',sans-serif;
}

li a:hover {
  color: #42b983;
  
}

#mainBar {
  display: flex;
  margin-top: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9c9c9c;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

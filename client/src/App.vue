<template>
  <div id="app">

    <nav id="nav" class="navbar navbar-light fixed-top" style="background-color: #bf43b3;">
      <router-link class="navbar-brand" to="/">BuyStuff</router-link>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Find stuff...">
        <button class="btn btn-outline-success my-2 my-sm-0"
                id="search-btn"
                type="submit">Search</button>
      </form>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle"
            href="#" id="navbarDropdown"
            role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
          Account
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Manage</a>
          <a class="dropdown-item" href="#">Logout</a>
        </div>
      </li>
    </nav>
    <div class="side-bar">
      <ul>
        <li class="list-heading"><h3>Categories</h3></li>
        <li>Food</li>
        <li>Fashion</li>
        <li>Tools</li>
      </ul>
    </div>
    <router-view id="products-view"/>

  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 60px;
  position: fixed;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-brand {
  color: yellow !important;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

#search-btn {
  background-color: #42b983;
  color: white;
}

#products-view {
  top: 60px;
  left: 300px;
  position: absolute;
  height: calc(100vh - 60px);
}

li {
  list-style: none;
}

.form-control {
  width: 50vw;
}

.side-bar {
  background: #2c3e50;
  color: white;
  width: 250px;
  top: 60px;
  height: calc(100vh - 60px);
  position: fixed;
  overflow-y: auto;
  text-align: left;
  line-height: 40px;
}

li.list-heading {
  margin-left: -15px;
  margin-top: 30px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular',
  'Lucida Grande', 'Lucida Sans Unicode',
  Geneva, Verdana, sans-serif;
}
</style>

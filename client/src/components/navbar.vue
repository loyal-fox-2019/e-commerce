<template>
    <div>
        <nav id="nav" class="navbar navbar-light fixed-top" style="background-color: #bf43b3;">
        <router-link class="navbar-brand" to="/">
        <img src="../../public/shopping-bag.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
        BuyStuff
        </router-link>
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
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
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

li {
  list-style: none;
}

.form-control {
  width: 50vw;
}

</style>
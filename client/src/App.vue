<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark positionNya">
      <router-link to="/">Home</router-link>
      <router-link class="ml-2" to="/about">About</router-link>
      <router-link class="ml-2" to="/login">Register</router-link>
      <router-link class="ml-2" to="/products">Product List</router-link>
      <router-link class="ml-2" to="/additem">Admin to Add item</router-link>
      <router-link class="ml-2" to="/usercart">User Cart Page</router-link>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo02"
      >
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
          <div class="img-frame-circle dropleft">
            <img
              src="https://img.icons8.com/officel/2x/user.png"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              alt="Image"
              class="img-fluid dropdown-toggle cursorNya"
            />
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Profile</a>
              <a class="dropdown-item" href="#">Sign Out</a>
            </div>
          </div>
        </form>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style lang="scss">
.img-frame-circle {
  position: relative;
}

.cursorNya {
  cursor: pointer;
}

.img-frame-circle > .img-fluid {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: #b8860b;
  object-fit: cover;
  object-position: center right;
}
</style>

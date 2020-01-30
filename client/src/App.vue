<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark positionNya">
      <!-- <router-link to="/">Home</router-link>
      <router-link class="ml-2" to="/about">About</router-link>
      <router-link class="ml-2" to="/login">Register</router-link>
      <router-link class="ml-2" to="/products">Product List</router-link>
      <router-link class="ml-2" to="/additem">Admin to Add item</router-link>
      <router-link class="ml-2" to="/usercart">User Cart Page</router-link> -->
      <h3 style="color:white; cursor:pointer" @click.prevent="home">
        MusicOne
      </h3>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo02"
      >
        <span class="spanduk h1 mb-2" v-if="addItem">
          <b-icon
            @click.prevent="trasactionPage"
            class="mt-3 mr-3"
            icon="document-text"
            variant="secondary"
            v-b-tooltip.hover
            title="All Transaction List"
            style="cursor:pointer;"
          ></b-icon>
        </span>
        <button
          v-show="addItem"
          @click="showAdditemPage"
          class="btn btn-info my-2 my-sm-0 mr-3"
        >
          add Item
        </button>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
          <button
            v-show="showRegisterLoginPage"
            class="btn btn-info my-2 my-sm-0 ml-3"
          >
            Login
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
              v-show="!showRegisterLoginPage"
            />
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                class="dropdown-item"
                style="cursor:pointer"
                @click.prevent="userCart"
                >Profile</a
              >
              <a
                class="dropdown-item"
                style="cursor:pointer"
                @click.prevent="logOut"
                >Sign Out</a
              >
            </div>
          </div>
        </form>
      </div>
    </nav>

    <router-view v-show="!showRegisterLoginPage" />
    <RegisterLogin v-show="showRegisterLoginPage"></RegisterLogin>
  </div>
</template>

<script>
import RegisterLogin from './views/RegisterLogin'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      addItem: false
    }
  },
  components: {
    RegisterLogin
  },
  methods: {
    ...mapMutations(['HIDE_LOGIN', 'SHOW_LOGIN']),
    ...mapActions([
      'getUserLogin',
      'getAllItem',
      'getUserCart',
      'getAllTransaction'
    ]),
    showAdditemPage() {
      this.$router.push({
        path: '/additem'
      })
    },
    userCart() {
      this.$router.push({
        path: '/usercart'
      })
    },
    home() {
      this.$router.push({
        path: '/'
      })
    },
    logOut() {
      localStorage.removeItem('token')
      this.SHOW_LOGIN()
    },
    trasactionPage() {
      this.$router.push({
        path: '/transaction'
      })
    }
  },
  computed: {
    showRegisterLoginPage() {
      return this.$store.state.showRegisterLoginPage
    },
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    showRegisterLoginPage: function(newValue, oldValue) {
      if (!newValue) {
        this.getAllTransaction()
        this.getUserLogin()
        this.getUserCart()
      }
    },
    user: function(newValue, oldValue) {
      if (newValue.role === 'admin') {
        this.addItem = true
      } else {
        this.addItem = false
      }
    }
  },
  created() {
    this.getAllItem()
    this.getAllTransaction()
    if (localStorage.token) {
      this.HIDE_LOGIN()
      this.getUserLogin()
      this.getUserCart()
    }
  }
}
</script>

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

<template>
  <div class="navBar">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link to="/" class="link">
          <i class="far fa-lg fa-gem"></i>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-navbar-item>
            <router-link to="/" class="link">Home</router-link>
          </b-navbar-item>
          <b-navbar-item>
            <router-link to="/myProducts" class="link">My Products</router-link>
          </b-navbar-item>
          <b-navbar-item>
            <router-link to="/addProduct" class="link">Sell Product</router-link>
          </b-navbar-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" v-model="searchValue" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" v-on:click="search">Search</b-button>
          </b-nav-form>
          <b-nav-item>
            <router-link to="/myCarts" class="link">
              <i class="fas fa-lg fa-shopping-cart"></i>
            </router-link>
          </b-nav-item>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped>
.link {
  font-weight: bold;
  margin-left: 10px;
  color: white;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "navbar",
  data() {
    return {
      searchValue: "",
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    search() {
      axios({
        method: "get",
        url: `${this.baseUrl}/product/${this.searchValue}`
      })
        .then(({ data }) => {
          // console.log(data);
          this.$emit("search", data);
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  }
};
</script>
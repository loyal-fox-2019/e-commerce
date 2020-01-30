<template>
    <div>
        <b-navbar id="navbar" class="fixed-top justify-content-between">
            <b-navbar-brand tag="h1">Dafito Ban</b-navbar-brand>
            <b-navbar-nav class="navbar-nav">
                <b-nav-item href="#" class="navbar-list">
                    <router-link to="/" class="router-link">Home</router-link>
                </b-nav-item>
                <!-- Navbar dropdowns -->
                <b-nav-item class="navbar-list">
                    <router-link to="/wheels" class="router-link">Wheels</router-link>
                </b-nav-item>

                <b-nav-item class="navbar-list">
                    <router-link to="/portofolio" class="router-link">Portofolio</router-link>
                </b-nav-item>

                <b-nav-item href="#" class="navbar-list">Contact</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item class="navbar-cart" v-if="isLoggedIn === true">
                    <i class="fas fa-shopping-cart mr-3"></i>
                        <router-link to="/cart" class="router-link">Cart</router-link>
                </b-nav-item>
                <b-nav-form>
                    <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button variant="dark" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
                <router-link v-if="isLoggedIn === false" to="/login" class="btn btn-dark my-2 my-sm-0 ml-3">Login</router-link>
                <b-nav-item-dropdown v-if="isLoggedIn === true" right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em style="font-size: 20px; color: black; font-weight: 500;">User</em>
                </template>
                <b-dropdown-item href="#" v-if="isAdmin === true">
                    <router-link to="/list-product" style="text-decoration: none; color: black;">List Product</router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#" v-if="isAdmin === true">
                    <router-link to="/new-wheels" style="text-decoration: none; color: black;">Add New Product</router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#" v-if="isAdmin === true">
                    <router-link to="/add-portofolio" style="text-decoration: none; color: black;">Add New Portolio</router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#" v-on:click.prevent="logOut()">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['isLoggedIn', 'isAdmin'],
  methods: {
      logOut: function() {
          localStorage.clear();
          this.$emit('userLogOut');
          this.$router.push('/');
      }
  }
};
</script>

<style scoped>
    nav {
        padding-left: 80px ;
        background-color: rgba(255,255,255,0.5);
    }
    .navbar-brand {
        margin-bottom: 0 ;
        color: black ;
        font-size: 30px ;
        margin-right: 4rem;
        letter-spacing: 4px;
    }
    .navbar-nav {
        margin-left: 30px;
    }
    .nav-link {
        color: #0000;
    }
    .navbar-list {
        padding: 0 20px;
        font-size: 19px;
        font-weight: bold;
        color: black !important;
    }
    .navbar-list:hover {
        background-color: #EC3527;
    }
    .navbar-list:active {
        background-color: #EC3527;
        color: #ffff;
    }
    .navbar-light .navbar-nav .nav-link {
        color: black !important;
    }
    .router-link {
        color: #000;
        text-decoration: none;
    }
    .navbar-cart {
        padding: 0 20px;
        font-size: 17px;
        font-weight: bold
    }
    span {
        color: black !important;
    }
</style>

<template>
    <div>
        <nav id="nav" class="navbar navbar-light fixed-top" style="background-color: #bf43b3;">
            <router-link class="navbar-brand mr-auto" to="/">
                <img src="../../public/shopping-bag.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
            BuyStuff
            </router-link>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Find stuff...">
            <button class="btn btn-outline-success my-2 my-sm-0"
                    id="search-btn"
                    >Search</button>
        </form>
        <router-link class="ml-auto" to="/cart">
            <button class="btn" id="cart-btn">
                <span class="fas fa-shopping-cart"></span>
            </button>
        </router-link>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
                href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
            {{isLogin ? this.$cookies.get('username') : "Account" }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" href="#" to="/login" v-if="!isLogin">Login</router-link>
                <router-link class="dropdown-item" href="#" to="/myproducts" v-if="isLogin">Manage</router-link>
                <router-link class="dropdown-item" to="/add-product" v-if="isLogin">Sell</router-link>
                <a class="dropdown-item" href="#" v-if="isLogin" @click="logoutUser">Logout</a>
                
            </div>
        </li>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            }
        },
        created() {
            this.$store.commit('SET_LOGIN_STATE',this.$cookies.isKey('username') && this.$cookies.isKey('token'))
        },
        methods: {
            logoutUser() {
                this.$cookies.remove('username');
                this.$cookies.remove('token');
                this.$cookies.remove('email');
                this.$store.commit('SET_LOGIN_STATE',false);
                this.$router.push('/')
            }
        }
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

#cart-btn {
  background-color: blue;
  color: white;
}


li {
  list-style: none;
}

.form-control {
  width: 50vw;
  margin: auto;
}

</style>
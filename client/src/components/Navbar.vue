<template>
  <div>
    <b-navbar class="navbar fixed-top" toggleable="lg" type="light" variant="white">
      <div class="nav-side">
        <b-navbar-brand to="/">
          <img src="../assets/logam-mulia.jpg">
        </b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item to="/purchase">GOLD BARS</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/purchase/series">BATIK SERIES INDONESIA</b-nav-item>
        </b-navbar-nav>

      </div>
      <div class="nav-side">
        <b-navbar-nav>
          <b-nav-item @click="isLogin"><i class="fas fa-shopping-bag" right></i>
          <b-badge v-if="cart !== undefined" variant="warning"> {{cart}} </b-badge>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item v-if="(!this.login)" to="/login">LOGIN/REGISTER</b-nav-item>
          <b-nav-item v-else @click.prevent="logout">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item href="#" right>
            <img src="../assets/antam.png">
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import GoogleLogin from 'vue-google-login'

export default {
  name: 'navbar',
  data () {
    return {
      googleSignInParams: {
        client_id: '389858522728-c94a09athmmeo7jhkpsfcahqrt0gl4a3.apps.googleusercontent.com',
      },
    }
  },
  computed: {
    cart() {
      if (this.login) {
        return this.$store.state.cart.items;
      }
    },
    login() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    isLogin() {
      this.$router.push('/login');
    },
    logout() {
      swal.fire({
        title: 'Are you sure to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!',
      }).then((result) => {
        if (result.value) {
          swal.fire({
            title: 'Success!',
            text: 'See you soon.....',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          localStorage.removeItem('token');
          // const auth2 = gapi.auth2.getAuthInstance();
          // auth2.signOut();
          this.$router.push('/');
        }
      });
    },
  },
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$store.dispatch('fetchCart');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');

.navbar {
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 display: flex !important;
 flex-direction: row !important;
 justify-content:space-between;
 font-family: 'Hind Siliguri', sans-serif;
}

.nav-side {
  display:flex;
  align-items:center;
}

img {
  height: 50px;
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

.navbar-light .navbar-nav .nav-link:hover, .nav-link:focus {
    color: #cb9b2d;
}
</style>

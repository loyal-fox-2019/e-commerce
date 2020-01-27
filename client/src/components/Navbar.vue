<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/">
          <a class="navbar-brand" href="#">
            <i class="fas fa-shopping-bag"></i> Perfectly
          </a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style="te:center;">
        <div class="navbar-nav">
          <router-link to="/home" v-if="isLogin">
            <a class="nav-item nav-link" href="#">Gallery</a>
          </router-link>
          <router-link to="/cart" v-if="isLogin">
            <a class="nav-item nav-link" href="#">MyCart</a>
          </router-link>
          <router-link to="/mytransaction" v-if="isLogin">
            <a class="nav-item nav-link" href="#">Transactions</a>
          </router-link>
          <router-link to="/admin">
            <a class="nav-item nav-link" href="#" v-if="isLogin && role=='admin'">Admin</a>
          </router-link>
        </div>
      </div>
      <div class="navbar-nav">
        <a class="nav-item nav-link" href data-toggle="modal"
          data-target="#loginModal"
          tabindex="-1"
          aria-disabled="true" v-if="!isLogin">Login</a>
        <a class="nav-item nav-link" href="#" v-if="isLogin" @click="logout">Logout</a>
      </div>
    </nav>
</template>

<script>
import { mapState , mapMutations } from "vuex";

export default {
    name:'Navbar',
    computed:{
        ...mapState(['role','isLogin'])
    },
    methods:{
      logout(){
        this.$swal({
            title: 'Are you sure to logout?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        })
        .then((result) => {
          if (result.value) {
            localStorage.clear();
            this.changeIsLogin();
            this.$router.push('/')
            Swal.fire('Logout!','You Have been Logout.','success')
          }
        })
      },
      ...mapMutations(["changeIsLogin"])
    }
}
</script>

<style>

</style>

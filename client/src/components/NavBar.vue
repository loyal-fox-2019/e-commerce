<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <h5 class="text-white">e-Store /KITA</h5>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav text-uppercase mx-auto">
                <li class="nav-item" >
                  <a href="" class="nav-link active" v-on:click.prevent="goToHome">Home</a>
                </li>
                <li class="nav-item" v-bind:class="{ active: isActive }">
                  <a href="" class="nav-link active" v-on:click.prevent="goToAbout">About</a>
                </li>
              </ul>
              <a href="" class="nav-link text-white" v-on:click.prevent="addProduct">(<span>Add Product</span>)</a>
              <button class="btn btn-info" v-on:click.prevent="logout">logout</button>
              <p class="text-white ml-3 mt-3">{{ user }}</p>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      user: localStorage.getItem('user'),
      isActive: false,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      this.$router.push('/login');
    },
    addProduct() {
      this.$router.push('/products');
    },
    goToHome() {
      this.$router.push('/');
    },
    goToAbout() {
      this.$router.push('/about');
    }
  }
}
</script>

<style scoped>
    .navbar {
        background-color: #171717;
        border-bottom: 1px solid #333;
    }

    .nav-item {
        margin-right: 20px;
        font-weight: 200;
    }

    .nav-item.active a {
        color: rgb(245, 225, 48) !important;
        font-weight: 600;
    }

    .nav-link span {
        color: rgb(245, 225, 48) !important;
        font-weight: 600;
    }
</style>
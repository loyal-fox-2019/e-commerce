<template>
  <nav
    class="flex justify-between p-2 items-center z-40 shadow-2xl border-solid border-orange-700 absolute w-full"
    :class="{ 'custom-class': scrollPosition }"
  >
    <div class="ml-2">
      <router-link
        to="/"
        class="flex items-center px-1 text-orange-900 hover:text-orange-700"
      >
        <img src="../assets/icon.png" width="54" height="54" />
        <p class="text-3xl ml-2">Guitar Store</p>
      </router-link>
    </div>
    <div class="mr-2 flex" v-if="username">
      <router-link
        to="/cart"
        class="mr-3 p-2 text-orange-700 hover:text-orange-800"
      >
        <span class="fas fa-shopping-cart"></span>
      </router-link>
      <p
        to="/login"
        class="mr-2 px-2 py-2 text-orange-700 hover:text-orange-800"
      >
        {{ username }}
      </p>
      <button
        class="mr-3 p-2 text-orange-700 hover:text-orange-800"
        @click="logout"
      >
        logout
      </button>
    </div>
    <div class="mr-2" v-else>
      <router-link
        to="/login"
        class="mr-2 px-2 py-2 text-orange-700 hover:text-orange-800"
        >Login</router-link
      >
      <router-link
        to="/register"
        class="mr-3 p-2 text-orange-700 hover:text-orange-800"
        >Register</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: function() {
    return {
      scrollPosition: null,
    }
  },
  methods: {
    logout() {
      const vm = this
      this.$store.dispatch('logout', { vm })
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY
    })
  },
  computed: {
    username() {
      return this.$store.state.username
    },
  },
}
</script>

<style scoped>
.custom-class {
  background-color: white;
  position: fixed;
}
</style>

<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <h2 tag="div" class="font-bold ">JuBel</h2>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse class="font-bold" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
            class="hover:bg-green-300 text-black navigation-link lg:ml-4 p-4"
            to="/"
          >
            Home
          </router-link>
          <router-link
            class="hover:bg-green-300 text-black navigation-link lg:ml-4 p-4"
            to="/bag"
          >
            Bag
          </router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link
            class="hover:text-gray-900 font-bold hover:bg-blue-600 text-black navigation-link bg-blue-400 rounded flex align-items-center px-3"
            to="/login"
            v-if="!loggedIn"
          >
            Login
          </router-link>

          <b-dropdown
            class="bg-blue-400 flex align-items-center"
            href="#"
            :text="username"
            v-if="loggedIn"
          >
            <b-dropdown-item @click.prevent="$bvModal.show('jualan-modal')">
              Mulai Jualan
            </b-dropdown-item>
            <b-dropdown-item to="/profile">My Profile</b-dropdown-item>
            <b-dropdown-item to="/profile/sell-list">
              List Penjualan
            </b-dropdown-item>
            <b-dropdown-item to="/profile/buy-list">
              List Pembelian
            </b-dropdown-item>
          </b-dropdown>
          <JualanModal></JualanModal>
          <!-- Logout -->
          <a
            class="hover:text-gray-900 font-bold hover:bg-blue-600 text-black navigation-link bg-blue-400 rounded flex align-items-center px-3 lg:ml-4"
            href="#"
            @click.prevent="logoutUser"
            v-if="loggedIn"
          >
            Logout
          </a>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import JualanModal from '../components/Jualan-Modal'
export default {
  name: 'Navbar',
  components: {
    JualanModal
  },
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  computed: {
    loggedIn() {
      const isLoggedIn = this.$store.state.isLoggedIn
      if (!isLoggedIn) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    logoutUser() {
      if (localStorage.getItem('platform')) {
        // eslint-disable-next-line
        const auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(function() {
          console.log('User signed out.')
        })
      }
      localStorage.removeItem('token')
      localStorage.removeItem('platform')
      this.$router.push('/')
      this.$store.state.isLoggedIn = false
    }
  }
}
</script>

<style scoped>
.navigation-link {
  text-decoration: none;
}
</style>

<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#"
          ><router-link to="/">Marzching Store</router-link></b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" @click.prevent="category(0)"
              >Brass</b-nav-item
            >
            <b-nav-item href="#" @click.prevent="category(1)"
              >Battery</b-nav-item
            >
            <b-nav-item href="#" @click.prevent="category(2)"
              >Front Ensemble
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" class="mr-3" v-b-modal.modal-cart
              >Cart
              <span
                style="background-color: red; color: white; font-size 18px; padding: 2px 5px 2px 5px;"
                >{{cart.length}}</span
              ></b-nav-item
            >

            <b-nav-form v-show="!loginStatus">
              <b-button
                size="md"
                class="my-2 my-sm-0"
                type="button"
                v-b-modal.modal-1
                >Login</b-button
              >
            </b-nav-form>

            <div id="loggedIn" v-show="loginStatus">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" v-show="adminStatus" @click.prevent="toAdminPage"
                  ><b-button variant="success"
                    >Add Item</b-button
                  ></b-dropdown-item
                >
                <b-dropdown-item href="#" @click.prevent="logout"
                  ><b-button variant="danger">Logout</b-button></b-dropdown-item
                >
              </b-nav-item-dropdown>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  data() {
    return {
      isLogin: this.$store.state.loginStatus,
      isAdmin: this.$store.state.isAdmin
    }
  },
  methods: {
    category(index) {
      this.$store.state.activePage.name = this.$store.state.categoryList[index].name
      this.$store.state.activePage.image = this.$store.state.categoryList[index].image
      this.$store.dispatch('FETCH_ITEM')
      this.$router.push(`/${this.$store.state.activePage.name}`)
    },
    logout() {
      this.$router.push('/')
      this.$store.commit('LOGOUT')
    },
    toAdminPage() {
      this.$router.push('/4dm1n')
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus
    },
    adminStatus() {
      return this.$store.state.isAdmin
    },
    cart() {
      return this.$store.state.cart
    }
  }
}
</script>

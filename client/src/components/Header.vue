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
            <b-nav-item href="#" @click.prevent="category(0)" to="/brass"
              >Brass</b-nav-item
            >
            <b-nav-item href="#" @click.prevent="category(1)"
              >Battery</b-nav-item
            >
            <b-nav-item href="#" @click.prevent="category(2)" to="/brass"
              >Front Ensemble</b-nav-item
            >
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" class="mr-4">Cart</b-nav-item>

            <b-nav-form v-show="!isLogin">
              <b-button
                size="md"
                class="my-2 my-sm-0"
                type="button"
                v-b-modal.modal-1
                >Login</b-button
              >
            </b-nav-form>

            <div id="loggedIn" v-show="isLogin">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
  name: 'header',
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    category(index) {
      this.$store.state.activePage.name = this.$store.state.categoryList[index]
    }
  }
}
</script>

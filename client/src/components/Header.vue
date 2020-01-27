<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand to="/">
          <b-icon icon="book-half-fill"></b-icon>
          Food Of Thought
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <!-- CART -->
            <b-nav-item-dropdown v-if="itemsInCart.length !== 0" right>
              <template v-slot:button-content>
                <b-icon-bucket></b-icon-bucket>
                <b-badge pill> {{ totalItem }} </b-badge>
              </template>
              <b-dropdown-item
                v-for="item in itemsInCart"
                :key="item.product_id"
              >
                {{ item.product.title.substring(0, 15) }}...
                <b-badge pill>{{ item.total }}</b-badge>
                <!-- ({{ item.total }}x) -->
              </b-dropdown-item>
              <b-dropdown-item to="/cart">
                <b-link to="/cart">Lihat Semua</b-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown v-else right>
              <template v-slot:button-content>
                <b-icon-bucket></b-icon-bucket>
              </template>
              <b-dropdown-item>Keranjangmu masih kosong 🙈</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown v-if="userProfile" right>
              <template v-slot:button-content>
                <b-img
                  fluid
                  :src="userProfile.avatar"
                  class="d-inline-block align-top"
                  alt="Kitten"
                  width="25px"
                />
              </template>
              <b-dropdown-item>Profile</b-dropdown-item>
              <b-dropdown-item @click="userSignOut">Sign Out</b-dropdown-item>

              <b-dropdown-item
                to="/add-new-item"
                v-if="userProfile.role === 'admin'"
                >Add New Item</b-dropdown-item
              >
            </b-nav-item-dropdown>

            <b-nav-item-dropdown v-else right>
              <template v-slot:button-content>
                User
              </template>
              <b-dropdown-item to="/user/signin">Sign In</b-dropdown-item>
              <b-dropdown-item to="/user/register">Register</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </header>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['userProfile', 'itemsInCart']),
    totalItem() {
      return this.itemsInCart.reduce((prev, curr) => {
        return prev + curr.total;
      }, 0);
    }
  },
  props: {},
  methods: {
    userSignOut() {
      localStorage.removeItem('token');
      this.$store.commit('setUserProfile', null);
    }
  },
  created() {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:3000/users/get-curr-user-profile', {
          headers: { token }
        })
        .then(({ data }) => {
          this.$store.commit('setUserProfile', data.data);
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="shadow-sm">
      <b-navbar-brand to="/">
        Tookoo
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" class="mr-3">Kategori</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="w-100">
          <b-row class="w-100">
            <b-col cols="10" align-self="center">
              <search-box
                @search="$emit('search', $event)"
                v-if="currentPath === '/products'"
              ></search-box>
            </b-col>
            <b-col cols="2">
              <b-row>
                <b-col
                  cols="3"
                  align-self="center"
                  :style="{ 'border-right': 'solid 1px grey' }"
                  class="pl-0"
                >
                  <b-button @click.prevent="showCart" size="sm" variant="light">
                    <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                    <span
                      v-if="cartList"
                      class="text-light font-weight-bold rounded bg-danger"
                    >
                      {{ cartList.length }}
                    </span>
                  </b-button>
                </b-col>
                <b-col
                  cols="9"
                  class="d-flex justify-content-around m-0 p-0"
                  v-if="!isLogin"
                >
                  <login-btn-modal @loggedIn="forceRerender"></login-btn-modal>
                  <register-btn-page :isBtn="true"></register-btn-page>
                </b-col>
                <b-col
                  cols="9"
                  class="d-flex justify-content-around m-0 p-0"
                  v-else
                >
                  <user-popover @isLogout="forceRerender"></user-popover>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import LoginBtnModal from "@/components/LoginBtnModal.vue";
import RegisterBtnPage from "@/components/RegisterBtnPage.vue";
import SearchBox from "@/components/SearchBox.vue";
import UserPopover from "@/components/UserPopover.vue";

export default {
  props: ["cartList"],
  components: {
    LoginBtnModal,
    RegisterBtnPage,
    SearchBox,
    UserPopover
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    forceRerender() {
      this.isLogin = !this.isLogin;
      location.reload();
    },
    showCart() {
      if (!localStorage.token) {
        this.$swal("Error", "Masook dulu untuk lihat keranjang", "error");
      } else {
        this.$router.push({ name: "my cart" });
      }
    }
  },
  computed: {
    name() {
      return localStorage.name;
    },
    currentPath() {
      return this.$route.fullPath;
    }
  },
  created() {
    this.isLogin = !!localStorage.name;
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  color: #42b983;
}
</style>

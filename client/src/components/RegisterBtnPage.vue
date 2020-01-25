<template>
  <div>
    <div id="register-btn" v-if="isBtn">
      <b-button
        to="/register/email"
        class="font-weight-bold"
        style="font-size:11px;width:70px;"
        size="sm"
        variant="success"
      >
        Daftar
      </b-button>
    </div>
    <b-container v-else>
      <div id="register-page">
        <b-row>
          <b-col class="my-5">
            <h1><router-link to="/">Tookoo</router-link></h1>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col cols="4" class="bg-success"></b-col>
          <b-col cols="4">
            <b-card
              title="Daftar Akun"
              class="shadow my-5"
              style="font-size:12px;"
            >
              <b-card-text class="font-weight-light">
                Sudah punya akun Tookoo?
                <router-link to="/login">Masuk</router-link>
                <g-signin-button
                  class="my-3"
                  @loggedIn="$router.push({ name: 'home' })"
                ></g-signin-button>
                <hr />
                <p style="color:#AFB7CF;">atau daftar dengan</p>
                <hr />
                <router-view></router-view>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import GSigninButton from "@/components/GSigninButton.vue";
export default {
  components: {
    GSigninButton
  },
  props: ["isBtn"]
};
</script>

<style scoped>
.container {
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

a {
  text-decoration: none;
}

a.router-link-active {
  font-family: sans-serif;
  font-weight: bold;
  color: #42b983;
}
</style>

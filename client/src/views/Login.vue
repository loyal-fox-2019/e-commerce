<template>
  <b-container fluid class="bv-example-row bv-example-row-flex-cols vh-100">
    <b-row class="justify-content-center" align-v="start">
      <b-col cols="4">
        <b-card
          title="Masook / Login"
          class="shadow my-5"
          style="font-size:13px;"
        >
          <b-card-text class="font-weight-light text-right">
            Belum punya akun ?
            <router-link to="/register/email">Daftar</router-link>
          </b-card-text>
          <b-card-text>
            <b-form @submit="login" class="mt-4">
              <b-form-group
                id="input-username"
                label="Username / Email"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  v-model="form.username"
                  type="text"
                  required
                  placeholder="Username disini"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-password"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Sembunyikan passwordmu"
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="outline-success" block>
                Masook
              </b-button>
            </b-form>
            <hr />
            <p style="color:#AFB7CF;" class="text-center">atau masuk dengan</p>
            <hr />
            <g-signin-button
              class="my-3"
              @loggedIn="$router.push({ name: 'show products' })"
            ></g-signin-button>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GSigninButton from "@/components/GSigninButton.vue";
import axios from "axios";

export default {
  components: {
    GSigninButton
  },
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      axios({
        method: "POST",
        url: `${this.$baseUrl}/users/login`,
        data: this.form
      })
        .then(({ data }) => {
          localStorage.userId = data.userId;
          localStorage.name = data.name;
          localStorage.token = data.token;
          this.$router.push({ name: "show products" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.container-fluid {
  background-color: #47a846;
}
</style>

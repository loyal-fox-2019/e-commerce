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

                <hr />
                <p style="color:#AFB7CF;">atau daftar dengan</p>
                <hr />
                <router-view></router-view>
                <!-- <div id="input-detail" v-else>
                  <b-form
                    @submit.stop.prevent="registerAccount"
                    class="text-left mt-2"
                  >
                    <b-form-group label="Nama Lengkap" label-for="fullname">
                      <b-form-input
                        id="fullname"
                        name="fullname"
                        v-model="$v.form.fullname.$model"
                        :state="validateState('fullname')"
                        aria-describedby="fullname-validator"
                      ></b-form-input>

                      <b-form-invalid-feedback id="fullname-validator">
                        Masukkan nama minimal 3 huruf untuk mendaftar.
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Username" label-for="username">
                      <b-form-input
                        id="username"
                        name="username"
                        v-model="$v.form.username.$model"
                        :state="validateState('username')"
                        aria-describedby="username-validator"
                      ></b-form-input>

                      <b-form-invalid-feedback id="username-validator">
                        Masukkan username minimal 3 huruf untuk mendaftar.
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Password" label-for="password">
                      <b-form-input
                        id="password"
                        name="password"
                        v-model="$v.form.password.$model"
                        :state="validateState('password')"
                        aria-describedby="password-validator"
                      ></b-form-input>

                      <b-form-invalid-feedback id="password-validator">
                        Masukkan nama minimal 3 huruf untuk mendaftar.
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                      label="Konfirmasi Password"
                      label-for="repeatPassword"
                    >
                      <b-form-input
                        id="repeatPassword"
                        name="repeatPassword"
                        v-model="$v.form.repeatPassword.$model"
                        :state="validateState('repeatPassword')"
                        aria-describedby="repeatPassword-validator"
                      ></b-form-input>

                      <b-form-invalid-feedback id="repeatPassword-validator">
                        Masukkan nama minimal 3 huruf untuk mendaftar.
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-button type="submit" size="sm" class="btn-block">
                      Daftar Akun
                    </b-button>
                  </b-form>
                </div> -->
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
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

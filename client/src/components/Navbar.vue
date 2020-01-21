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
              <b-input-group size="sm">
                <template v-slot:append>
                  <b-input-group-text>
                    <b-icon
                      icon="search"
                      scale="1"
                      variant="secondary"
                    ></b-icon>
                  </b-input-group-text>
                </template>
                <b-form-input></b-form-input>
              </b-input-group>
            </b-col>
            <b-col cols="2">
              <b-row>
                <b-col
                  cols="2"
                  align-self="center"
                  :style="{ 'border-right': 'solid 1px grey' }"
                  class="pl-0 pr-5"
                >
                  <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                </b-col>
                <login-btn-modal></login-btn-modal>
                <b-col cols="4">
                  <b-button
                    to="/register"
                    class="font-weight-bold"
                    style="font-size:11px;width:70px;"
                    size="sm"
                    variant="success"
                  >
                    Daftar
                  </b-button>
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

export default {
  components: {
    LoginBtnModal
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  color: black;
}

.navbar-brand.router-link-exact-active {
  color: #42b983;
}
</style>

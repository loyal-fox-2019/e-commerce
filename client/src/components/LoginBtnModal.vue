<template>
  <b-col cols="4">
    <b-button
      class="font-weight-bold"
      style="font-size:11px;width:70px;"
      size="sm"
      variant="outline-success"
      v-b-modal.modal-center
    >
      Masook
    </b-button>

    <b-modal
      id="modal-center"
      size="sm"
      centered
      hide-footer
      no-fade
      title="Masook"
      v-model="show"
    >
      <b-row>
        <b-col cols="9">&nbsp;</b-col>
        <b-col cols="2">
          <b-link
            class="font-weight-light"
            style="font-size:13px;"
            @click.prevent="$router.push({ name: 'register email' })"
          >
            Daftar
          </b-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form @submit="login">
            <b-form-group
              id="input-username"
              label="Username or Email"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="form.username"
                required
                placeholder="Enter username or email"
                size="sm"
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
                placeholder="Enter Password"
                size="sm"
              ></b-form-input>
            </b-form-group>

            <b-button
              type="submit"
              variant="outline-success"
              size="sm"
              block
              class="my-3"
            >
              Login
            </b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          class="text-center font-weight-light text-secondary"
          style="font-size:13px;"
        >
          <hr />
          <p>atau masuk dengan</p>
          <hr />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <g-signin-button
            @loggedIn="forceRerender"
            :key="show"
          ></g-signin-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-col>
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
      },
      show: false
    };
  },
  methods: {
    reloadPage() {
      location.reload();
    },
    forceRerender() {
      this.$emit("loggedIn", this.show);
      this.show = !this.show;
    },
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
          this.forceRerender();
        })
        .catch(err => {
          console.log(err);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<template>
  <div class="center">
    <b-tabs content-class="mt-3">
      <b-tab title="Login">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-input type="password" aria-describedby="password-help-block" v-model="form.password"></b-input>
            <b-form-text id="password-help-block"></b-form-text>
          </b-form-group>

          <b-button type="submit" variant="primary" v-on:click="login">Sign In</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </b-form>
      </b-tab>
      <b-tab title="Register">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-3"
            label="Email address:"
            label-for="input-3"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-3"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-5" label="First Name:" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.firstName"
              type="text"
              required
              placeholder="Enter first name"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-6" label="Last Name:" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="form.lastName"
              type="text"
              placeholder="Enter Last Name(optional)"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="Password:" label-for="input-4">
            <b-input
              type="password"
              id="text-password"
              aria-describedby="password-help-block"
              v-model="form.password"
            ></b-input>
            <b-form-text id="password-help-block">Your password must be at least 6 characters long</b-form-text>
          </b-form-group>

          <b-button type="submit" variant="primary" v-on:click="register">Sign Up</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "loginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      show: true,
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.firstName = "";
      this.form.lastName = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    register() {
      let url = this.baseUrl;
      let firstName = this.form.firstName;
      let lastName = this.form.lastName;
      let email = this.form.email;
      let password = this.form.password;
      axios({
        method: "POST",
        url: `${url}/user/register`,
        data: {
          firstName,
          lastName,
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("firstName", data.userRegistered.firstName);
          localStorage.setItem("userId", data.userRegistered._id);
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    login() {
      let url = this.baseUrl;
      let email = this.form.email;
      let password = this.form.password;
      axios({
        method: "POST",
        url: `${url}/user/login`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("firstName", data.emailFound.firstName);
          localStorage.setItem("userId", data.emailFound._id);
          localStorage.setItem("token", data.token);
          this.$router.push("/");
        })
        .catch(err => {
          // console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },

    onSuccess(googleUser) {
      // let url = this.baseUrl;
      console.log("haiiiii");
      console.log(googleUser, "iniii");
      // console.log("Logged in as: " + googleUser.getBasicProfile().getName());
      // let firstName = googleUser.getBasicProfile().getName();
      // const id_token = googleUser.getAuthResponse().id_token;
      // axios({
      //   method: "POST",
      //   url: `${url}/google`,
      //   data: {
      //     idtoken: id_token,
      //     firstName
      //   }
      // }).then(user => {
      //   localStorage.setItem("token", user.data.token);
      //   localStorage.setItem("idUser", user.data.user._id);
      //   this.$emit("login", "login");
      // });
    }
  }
};
</script>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
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
          <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          >Continue with Google</button>
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
import GoogleSignInButton from "vue-google-signin-button-directive";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "loginPage",
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      show: true,
      // baseUrl: "http://localhost:3000",
      baseUrl: "http://e-commerce-server.amadyanissa.my.id:3000",
      // clientId:
      //   "275122678516-ttf9madj8sqdv83kokgb62c3iaer1ld5.apps.googleusercontent.com",
      clientId:
        "275122678516-n3103ppn9ns2g6395l9pqp1lnbsvt7sn.apps.googleusercontent.com"
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
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      // console.log(idToken);
      let url = this.baseUrl;
      axios({
        method: "POST",
        url: `${url}/user/google`,
        data: {
          idtoken: idToken
        }
      })
        .then(({ data }) => {
          localStorage.setItem("firstName", data.user.firstName);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("token", data.token);
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
    OnGoogleAuthFail(error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error
      });
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
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
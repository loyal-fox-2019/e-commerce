<template>
  <div>
    <b-button
      v-google-signin-button="clientId"
      size="sm"
      variant="primary"
      block
    >
      <font-awesome-icon :icon="['fab', 'google']" />
      Masuk Pakai Google
    </b-button>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios";

export default {
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      clientId:
        "990417810041-4rsdtip8fst1aq497t6fo0s4oacurlnk.apps.googleusercontent.com"
    };
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
        method: "POST",
        url: `${this.$baseUrl}/users/oauth`,
        data: {
          token: idToken
        }
      })
        .then(({ data }) => {
          localStorage.userId = data.userId;
          localStorage.token = data.token;
          localStorage.name = data.fullname;
          this.$emit("loggedIn", true);
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

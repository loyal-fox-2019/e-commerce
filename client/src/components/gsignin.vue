<template>
    <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Sign in with Google
    </g-signin-button>
</template>
 
<script>
import axiosReq from "../config/axios";
export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object} 
       */
      googleSignInParams: {
        client_id: '1055647920913-8pqfh0q919tf5cb58kop5459ki39o0gj.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile();
      // The ID token you need to pass to your backend:
      console.log(profile.getEmail());
      const email = profile.getEmail();
      
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      
      axiosReq({
        url: "/users/gsignin",
        method: "POST",
        data: {
          email: email,
          id_token: id_token
        }
      })
      .then(({data}) => {
          this.$cookies.set('token',data.token);
          this.$cookies.set('username',data.username);
          this.$cookies.set('email',email);
          this.$store.commit('SET_LOGIN_STATE',true);
          this.$router.push({path:'/'})
      })
      .catch((err) => {
        console.log(err); 
      })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log(error)
    }
  }
}
</script> 
 
<style>
.g-signin-button {
    width: 100% !important;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
}

.g-signin-button:hover {
    background-color: #0046be;
    transition: 500ms;
}
</style> 
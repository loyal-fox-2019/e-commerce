<template>
  <div id="container">
    <div class="vid-container" v-if="showing">
      <div class="inner-container">
        <div class="box" style="height: 100vh">
          <h1 style="user-select:none">Login</h1>
          <input
            autocomplete="off"
            type="text"
            placeholder="Email"
            v-model="email"
            max="25"
            required
          />
          <input
            autocomplete="off"
            type="password"
            placeholder="Password"
            v-model="password"
            maxlength="18"
            required
          />
          <button type="submit" @click.prevent="login">Sign in</button>
          <sui-button
              social="google"
              content="Google"
              icon="google"
              color="teal"
              @click.prevent="onSignIn"
            />
          <p style="user-select:none">
            Doesn't have account?
            <span @click.prevent="show(false)">Sign Up here</span>
          </p>
        </div>
      </div>
    </div>
    <div class="vid-container" v-else>
      <div class="inner-container" style="height: 700px; margin-top:-110px">
        <div class="box" style="height: 100vh">
          <h1 style="user-select:none">Register</h1>
          <input
            autocomplete="off"
            type="text"
            placeholder="Email"
            v-model="email"
            max="25"
            required
          />
          <input
            autocomplete="off"
            type="password"
            placeholder="Password"
            v-model="password"
            maxlength="18"
            required
          />
          <input
            autocomplete="off"
            type="name"
            placeholder="Name"
            v-model="name"
            maxlength="10"
            required
          />
          <input
            autocomplete="off"
            type="text"
            placeholder="Phone"
            v-model="phone"
            maxlength="16"
            required
          />
          <input
            autocomplete="off"
            type="text"
            placeholder="City"
            v-model="city"
            maxlength="20"
            required
          />
          <button type="submit" @click.prevent="register">Sign up</button>
          <p style="user-select:none">
            Already have account?
            <span @click.prevent="show(true)">Sign In here</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormLoginRegister",
  data() {
    return {
      showing: true,
      email: "",
      password: "",
      name: "",
      phone: "",
      city: ""
    };
  },
  methods: {
    show(val) {
      this.showing = val;
    },
    login() {
      console.log("masuk login");
      // if(this.email == 'admin@admin.admin' && this.password == 'adminadmin'){
      //   localStorage.setItem('token', 'admin')
      //   this.$router.push('/admin')
      // }else{
      this.axios
        .post("users/login", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$store.state.isLogin = true
          console.log(data.name);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response.data);
        });
      // }
    },
    register() {
      console.log("masuk register");
      this.axios
        .post("users/register", {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          city: this.city
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$store.state.isLogin = true
          console.log(data.name);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    onSignIn() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          return this.axios({
            method: "post",
            url: "/users/google",
            data: { token: GoogleUser.getAuthResponse().id_token }
          });
          console.log(this.$gAuth.isAuthorized);
          // this.$root.nowLogin = this.$gAuth.isAuthorized;
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$store.state.isLogin = true
          this.$router.push('/home')
        })
        .catch(error => {
          console.log("Google OAuth Failed");
          console.log(error);
          console.log(error);
          this.$swal.fire('Google OAuth Failed')
        });
    }
  }
};
</script>

<style scoped>
/* my own style */
body {
  padding: 0;
  margin: 0;
}
.vid-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.bgvid {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
}
.inner-container {
  width: 400px;
  height: 400px;
  position: absolute;
  top: calc(50vh - 200px);
  left: calc(50vw - 200px);
  overflow: hidden;
}
.bgvid.inner {
  top: calc(-50vh + 200px);
  left: calc(-50vw + 200px);
  filter: url("data:image/svg+xml;utf9,<svg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'><filter%20id='blur'><feGaussianBlur%20stdDeviation='10'%20/></filter></svg>#blur");
  -webkit-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  filter: blur(10px);
}
.box {
  position: absolute;
  height: 100%;
  width: 100%;
  font-family: Helvetica;
  color: #fff;
  background: rgba(0, 0, 0, 0.13);
  padding: 30px 0px;
}
.box h1 {
  text-align: center;
  margin: 30px 0;
  font-size: 30px;
}
.box input {
  display: block;
  width: 300px;
  margin: 20px auto;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border: 0;
}
.box input:focus,
.box input:active,
.box button:focus,
.box button:active {
  outline: none;
}
.box button {
  background: #2ecc71;
  border: 0;
  color: #fff;
  padding: 10px;
  font-size: 20px;
  width: 330px;
  margin: 20px auto;
  display: block;
  cursor: pointer;
}
.box button:active {
  background: #27ae60;
}
.box p {
  font-size: 14px;
  text-align: center;
}
.box p span {
  cursor: pointer;
  color: rgb(255, 255, 255);
  text-decoration-line: underline;
}
</style>
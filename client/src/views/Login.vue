<template>
  <div>
      <div class="wrapper">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="form-card" v-animate-css="'fadeInDown'">
                        <h3 class="mb-3">Sign In</h3>
                        <b-form v-on:submit.prevent="onSubmit()" v-if="show" class="margin-top-form">
                            <b-form-group
                                id="input-group-1"
                                label="Email address:"
                                label-for="input-1"
                                class="form-label"
                            >
                                <b-form-input
                                id="input-1"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="Enter email"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-2" label="Password:" label-for="input-2" class="form-label">
                                <b-form-input
                                id="input-2"
                                v-model="form.password"
                                type="password"
                                required
                                placeholder="Enter Password"
                                ></b-form-input>
                            </b-form-group>
                            
                            <div class="button-form-container">
                                <b-button type="submit" variant="dark" class="mt-3 mb-3 btn-lg btn-login" style="width: 100%">Login</b-button>
                                <br>
                                <router-link to="/register" class="btn-lg btn-light btn-register">Register</router-link>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/user/privateAuth',
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        .then(respond => {
          swal.fire({
            icon: 'success',
            title: 'Login Success'
          })
          if(typeof respond.data.data === 'object') {
            localStorage.setItem('token', respond.data.data.userToken);
            localStorage.setItem('USERTYPE', 'admin');
          } else {
            localStorage.setItem('token', respond.data.data);
          }
          this.$emit('userLogin');
          this.$router.push({path: '/'});
        })
        .catch(error => {
          const errorRespond = {error};
          if(Array.isArray(errorRespond.error.response.data.errors)) {
            swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: `${errorRespond.error.response.data.errors[0]}`
            }) 
          } else {
            swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: `${errorRespond.error.response.data.errors}`
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
  url('../assets/image/login-bg.jpg') no-repeat center;
  background-size: cover;
}
.row {
    padding-top: 120px;
}
.form-card {
    padding: 50px 50px;
    box-shadow: 0 0 4px black;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}
.form-card h3 {
    text-align: center;
    letter-spacing: 3px;
    color: #ffffff;
}
.form-label {
    color: #ffffff;
}
.button-form-container {
    text-align: center;
}
.btn-login {
    font-weight: bold;
}
.btn-register {
    background-color: #e2e6ea;
    font-weight: bold;
    width: 100%;
    display: inline-block;
    text-decoration: none;
}
</style>
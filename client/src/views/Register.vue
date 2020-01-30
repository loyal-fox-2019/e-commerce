<template>
  <div>
      <div class="wrapper">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="form-card" v-animate-css="'flipInY'">
                        <h3 class="mb-3">Sign Up</h3>
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
                                placeholder="Input your email here"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                id="input-group-2"
                                label="Name:"
                                label-for="input-2"
                                class="form-label"
                            >
                                <b-form-input
                                id="input-2"
                                v-model="form.name"
                                type="text"
                                required
                                placeholder="Input your name here"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-3" label="Password:" label-for="input-3" class="form-label">
                                <b-form-input
                                id="input-3"
                                v-model="form.password"
                                type="password"
                                required
                                placeholder="Input your password here"
                                ></b-form-input>
                            </b-form-group>
                            
                            <div class="button-form-container">
                                <b-button type="submit" variant="dark" class="mt-3 mb-3 btn-lg btn-login" style="width: 100%">Register</b-button>
                                <br>
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
import Navbar from '../components/navbar';
import axios from 'axios';
import swal from 'sweetalert2'

export default {
    name: 'Register',
    components: {
        Navbar
    },
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/user/register',
          data: {
            email: this.form.email,
            name: this.form.name,
            password: this.form.password
          }
        })
        .then(respond => {
          return axios({
            method: 'post',
            url: 'http://localhost:3000/user/privateAuth',
            data: {
              email: this.form.email,
              password: this.form.password
            }
          })
        })
        .then(respond => {
          swal.fire({
            icon: 'success',
            title: 'Register Success'
          })
          localStorage.setItem('token', respond.data.data);
          this.$emit('userRegister')
          this.$router.push({path: '/'})
        })
        .catch(error => {
          const errorRespond = {error};
          if(Array.isArray(errorRespond.error.response.data.errors)) {
            swal.fire({
              icon: 'error',
              title: 'Register failed',
              text: `${errorRespond.error.response.data.errors[0]}`
            }) 
          } else {
            swal.fire({
              icon: 'error',
              title: 'Register failed',
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
  url('../assets/image/register-bg.jpeg') no-repeat center;
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
}
</style>
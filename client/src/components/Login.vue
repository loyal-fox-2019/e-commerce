<template>
  <b-row class="justify-content-center py-2" id="konten">
        <b-row class="w-100 justify-content-center py-3">
            <h4>Login:</h4>
        </b-row>
        <b-row class="w-100 mx-3 pb-4">
            <b-col sm="3">
                <label for="inputEmail">Email: </label>
            </b-col>
            <b-col sm="9">
                <b-input
                id="inputEmail"
                v-model="email"
                type="email"
                required
                placeholder="Enter email"
                ></b-input>
            </b-col>
        </b-row>
        <b-row class="w-100 mx-3">
            <b-col sm="3">
                <label for="inputPassword">Password: </label>
            </b-col>
            <b-col sm="9">
                <b-input
                id="inputPassword"
                v-model="password"
                type="password"
                required
                placeholder="Enter password"
                ></b-input>
            </b-col>
        </b-row>
        <b-row class="w-100 mx-3 py-4" align-h="center">
            <b-col class="text-center">
                <g-signin-button class="btn btn-light mx-3" :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError"><i class="fab fa-google"></i> | Sign in with Google</g-signin-button>
                <b-button variant="primary" @click="login">Login</b-button>
            </b-col>
        </b-row>
    </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "login",
    data(){
        return {
            email: '',
            password: '',
            googleSignInParams: {
                client_id: '199854943337-895pidlcap8v66cslv8vm2u4net4nnm4.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        login: function(){
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data})=>{
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('userId', data.userId)
                Swal.fire(
                    'Login success!',
                    'You are now logged in',
                    'success'
                )
                this.$router.push('/')
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.message,
                })
            })
        },
        onSignInSuccess: function(googleUser){
            let id_token = googleUser.getAuthResponse().id_token
            axios({
                method: 'post',
                url: `http://localhost:3000/users/glogin/${id_token}`,
                data: {}
            })
            .then(({data})=>{
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('userId', data.userId)
                Swal.fire(
                    'Login success!',
                    'You are now logged in',
                    'success'
                )
                this.$router.push('/')
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.message,
                })
            })
        },
        onSignInError: function(error){
            console.log(error);        
        }
    }
}
</script>

<style scoped>
    label {
        font-size: 20px;
    }
    h4 {
        font-weight: bold;
    }
</style>
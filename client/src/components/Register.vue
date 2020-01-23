<template>
    <b-row class="justify-content-center py-2" id="konten">
        <b-row class="w-100 justify-content-center py-3">
            <h4>Register:</h4>
        </b-row>
        <b-row class="w-100 mx-3 pb-4">
            <b-col sm="3">
                <label for="inputName">Name: </label>
            </b-col>
            <b-col sm="9">
                <b-input
                id="inputName"
                v-model="name"
                type="text"
                required
                placeholder="Enter name"
                ></b-input>
            </b-col>
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
            <b-button variant="primary" @click="register">Register</b-button>
        </b-row>
    </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'register',
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register: function(){
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/register',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data})=>{
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                Swal.fire(
                    'Registration success!',
                    'You are now logged in',
                    'success'
                )
                this.$router.push('/')
            })
            .catch(err=>{
                let errMessage = ''
                for(let message of err.response.data.errors){
                    errMessage += `${message}<br>`
                }   
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    html: errMessage,
                })    
            })
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
<template>
    <form class="form-signin mx-auto" style="width: 30vw; height: 70vh;margin-top: 20vh;">
        <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
        <label for="inputUsername" class="sr-only">Username</label>
        <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required="" autofocus="">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click.prevent="registerUser">Sign up</button>
        <p class="mt-5 mb-3 text-muted">© 2020-2021</p>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'registration',
    data(){
        return{
            username: '',
            email: '',
            password:''
        }
    },
    components:{},
    methods:{
        registerUser(){
            console.log('masuk register')
            axios({
                method: 'post',
                url: `http://localhost:3000/user/register`,
                data:{
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data})=>{
                console.log(data)
                localStorage.setItem('token', data.token)
                this.$router.push('/')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
input{
  margin-top:2vh;
}
</style>
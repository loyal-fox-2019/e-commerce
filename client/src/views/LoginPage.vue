<template>
    <div id="login-page">
        <form class="form-signin" @submit.prevent="loginUser">
            <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>

            <input type="text" v-model="username" class="form-control" placeholder="Username" required autofocus>       
            <input type="password" v-model="password" class="form-control" placeholder="Password" required>
            
            <button class="btn btn-lg btn-primary btn-block" type="submit" id="std-signin">Sign in</button>
            <div id="error-msg">{{error}}</div><br>

            <gsignin @isLogin="$emit('isLogin')"></gsignin><br>

            <router-link class="btn btn-block switch-signinup" to="/register">
                Sign up 
            </router-link>
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios.js"
    export default {
        name: "LoginPage",
        data() {
            return {
                error: "",
                username: "",
                password: ""
            }
        },
        methods: {
            loginUser() {
                axiosReq({
                    url: "/users/login",
                    method: "post",
                    data: {
                        username: this.username,
                        password: this.password
                    }
                })
                .then(({data}) => {
                    this.$cookies.set('token',data.token);
                    this.$cookies.set('username',this.username);
                    this.username = "";
                    this.password = "";
                    this.error = "";
                    this.$store.commit('SET_LOGIN_STATE',true);
                    this.$router.push('/');
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data));               
                    this.password = "";
                    this.error = err.response.data.msg;
                })
            }
        }
    }
</script>

<style scoped>
.form-signin {
    margin: auto;
    height: 100%;
    width: 20vw !important;
}
.switch-signinup {
    border: 1px solid black;
}
</style>
<template>
    <div id="login-page">
        <form class="form-signin" @submit.prevent="loginUser">
            <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>

            <input type="email" v-model="email" class="form-control" placeholder="Email" required autofocus>       
            <input type="password" v-model="password" class="form-control" placeholder="Password" required>
            
            <button class="btn btn-lg btn-primary btn-block" type="submit" id="std-signin">Sign in</button>
            <div id="error-msg">{{error}}</div><br>

            <gsignin></gsignin><br>

            <router-link class="btn btn-block switch-signinup" to="/register">
                Sign up 
            </router-link>
        </form>
    </div>
</template>

<script>
    import gsignin from "../components/gsignin.vue";
    import axiosReq from "../config/axios.js"
    export default {
        name: "LoginPage",
        data() {
            return {
                error: "",
                email: "",
                password: ""
            }
        },
        components: {
            gsignin
        },
        methods: {
            loginUser() {
                axiosReq({
                    url: "/users/login",
                    method: "post",
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then(({data}) => {
                    this.$cookies.set('token',data.token);
                    this.$cookies.set('email',this.email);
                    this.$cookies.set('username',data.username);
                    this.email = "";
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
<template>
    <div>
        <form class="form-signin" @submit.prevent="registerUser">
            <h1 class="h3 mb-3 font-weight-normal">Sign up</h1>

            <input type="text" class="form-control" placeholder="Username" pattern="^[a-zA-Z0-9_]*$" v-model="username" required autofocus>       
            <input type="password" v-model="password" class="form-control" placeholder="Password (at least 6 characters)" minlength="6" required>
            <input type="password" v-model="password2" class="form-control" placeholder="Confirm password" minlength="6" required>
            
            <button class="btn btn-lg btn-primary btn-block" type="submit" id="std-signup">Sign up</button><br>
            *Only alphanumeric and underscores allowed for username.
            <div id="error-msg">{{error}}</div>
            <router-link class="btn btn-block switch-signinup" to="/login">
                Sign in 
            </router-link>
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios.js"
    export default {
        name: "RegisterPage",
        data() {
            return {
                error: "",
                username: "",
                password: "",
                password2: ""
            }
        },
        methods: {
            registerUser() {
                if(this.password != this.password2)
                {
                    this.password = "";
                    this.password2 = "";
                    this.error = "Passwords do not match.";
                }
                else
                {
                    axiosReq({
                        url: "/users/register",
                        method: "post",
                        data: {
                            username: this.username,
                            password: this.password
                        }
                    })
                    .then(() => {
                        return axiosReq({
                            url: "/users/login",
                            method: "post",
                            data: {
                                username: this.username,
                                password: this.password
                            }
                        })
                    })
                    .then(({data}) => {
                        this.$cookies.set('token',data.token);
                        this.$cookies.set('username',this.username);
                        this.username = "";
                        this.password = "";
                        this.password2 = "";
                        this.error = "";
                        this.$store.commit('SET_LOGIN_STATE',true);
                        this.$router.push('/')
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err.response.data));               
                        this.password = "";
                        this.password2 = "";
                        this.error = err.response.data.msg;
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .form-signin {
        width: 20vw;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .switch-signinup {
        border: 1px solid black;
    }

    #error-msg {
        color: red;
    }
</style>
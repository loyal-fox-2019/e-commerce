<template>
    <sui-menu attached="top">
        <sui-menu-menu>
            <sui-menu-item>
                <form-logo/>
            </sui-menu-item>
        </sui-menu-menu>
        <sui-menu-item>
            <search/>
        </sui-menu-item>
        <sui-menu-menu position="right">
            <sui-menu-item>
                <router-link to="/cart">
                    <cart-button/>
                </router-link>
            </sui-menu-item>
            <sui-menu-item v-if="isLogin">
                <user-button/>
            </sui-menu-item>
            <sui-menu-item right v-if="!isLogin">
                <signin-button/>
            </sui-menu-item>
        </sui-menu-menu>
    </sui-menu>
</template>

<script>
    import search from "./search";
    import signinButton from "./users/signinButton";
    import formLogo from "./formLogo";
    import cartButton from "./cartButton";
    import userButton from "./users/userButton";

    export default {
        name: "navBar",
        data() {
            return {
                isLogin: false
            }
        },
        methods: {
            setIsLogin() {
                if (!localStorage.getItem('token')) {
                    return
                }

                this.$axios({
                    method: 'GET',
                    url: '/api/users/verify',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    localStorage.clear();
                    console.log(response.data);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('token', response.data.token);
                    this.isLogin = !!localStorage.getItem('token');
                }).catch(err => {
                    console.log({err});
                    localStorage.clear();
                    this.$toast.error({
                        title: 'Error',
                        message: 'Sign in failed :('
                    });
                });
            }
        },
        mounted() {
            this.setIsLogin()
        },
        components: {
            search,
            signinButton,
            formLogo,
            cartButton,
            userButton
        }
    }
</script>

<style scoped>

</style>
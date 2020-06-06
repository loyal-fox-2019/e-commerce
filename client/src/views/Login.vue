<template>
    <div class="container w-25">
        <form v-if="page==='login'">
            <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-white" color="white">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password">
            </div>
            <button type="submit" class="btn btn-warning mr-2 mb-3" v-on:click.prevent="actLogin">Login</button>
            <button type="submit" class="btn btn-secondary mb-3" v-on:click.prevent="toRegisterPage">Register</button>
        </form>

        <form v-if="page==='register'">
            <div class="form-group">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" v-model="name">
            </div>
            <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password">
            </div>
            <button type="submit" class="btn btn-secondary mr-2 mb-3" v-on:click.prevent="toLoginPage">Login</button>
            <button type="submit" class="btn btn-success mb-3" v-on:click.prevent="actRegister">Register</button>
        </form>

        <div class="alert alert-danger" role="alert" v-if="isError">
        {{ error }}
        </div>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            page: 'login',
            isError: false,
            error: '',
        }
    },
    methods: {
        actLogin() {
            axios({
                url: 'http://localhost:3000/login',
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.email);
                localStorage.setItem('id', data._id);
                this.email = '';
                this.password = '';
                this.isError = false;
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err.response)
                this.isError = true;
                this.error = err.response.data.error;
            })
        },
        actRegister() {
            axios({
                url: 'http://localhost:3000/register',
                method: 'post',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.email);
                localStorage.setItem('id', data._id);
                this.name = '';
                this.email = '';
                this.password = '';
                this.isError = false;
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err.response)
                this.isError = true;
                this.error = err.response.statusText;
            })
        },
        toLoginPage() {
            this.page = 'login';
            this.isError = false;
        },
        toRegisterPage() {
            this.page = 'register';
            this.isError = false;
        }
    },
}
</script>

<style scoped>
.container {
    margin-top: 50px;
    padding-top: 50px;
    padding-bottom: 50px;
    border: 1px solid rgba(200,200,200,1);
    border-radius: 10px;
    box-shadow: 5px 8px 18px rgba(200,200,200,1);
    background-color: rgb(88, 78, 78);
    color: white;
}
</style>
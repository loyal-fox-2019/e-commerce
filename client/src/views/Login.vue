<template>
    <div class="login">
        <div class="container">
            <div class="user-accounts-header text-center mt-5">
                <router-link to="/">
                <img src="../assets/hires-tokopedia-logo.png" alt="logo" width="160">
                </router-link>
            </div>
            <div class="row justify-content-center bg-tokopedia">
                <div class="col-5">
                    <div class="user-accounts-form shadow p-5">
                        <form @submit.prevent="submitLogin">
                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="email" type="email" class="form-control">
                                <p class="user-input-info">Contoh: email@tokopedia.com</p>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input v-model="password" type="password" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-register btn-block mt-4">Masuk</button>
                            <p class="text">Belum punya akun Tokopedia <router-link to="/register" class="link-page">Daftar</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    submitLogin() {
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password,
      })
        .then(({ data }) => {
          console.log(data);
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.bg-tokopedia {
    background-image: url('../assets/register_new.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding: 100px 0;
}
.btn {
  padding: 1.075rem .75rem
}
.btn-register {
  background-color: rgb(3, 172, 14);
  border-color: rgb(3, 172, 14);
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 18px;
}
.user-accounts-form {
  border-radius: 3px;
  background-color: #fff;
}
.user-accounts-form label {
  color: rgba(0, 0, 0, .54);
  line-height: 1.33;
}
.user-accounts-form .user-input-info {
  font-size: 12px;
  line-height: 1.3;
  color: rgba(0, 0, 0, .38);
  padding-top: 5px;
}
.user-accounts-form .text {
  font-size: 14px;
  color: rgba(0, 0, 0, .54);
  text-align: center;
  padding-top: 10px;
}
.user-accounts-form .link-page {
  color: #42b549;
  font-weight: 600;
}
</style>

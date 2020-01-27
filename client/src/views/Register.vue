<template>
  <div class="register">
    <div class="container">
        <div v-if="success" class="alert alert-success mt-5" role="alert">
          {{ message }}
        </div>
        <div class="user-accounts-header text-center mt-5">
          <router-link to="/">
            <img src="../assets/hires-tokopedia-logo.png" alt="logo" width="160">
          </router-link>
        </div>
      <div class="row justify-content-center mt-5">
        <div class="col-5 text-center">
          <img src="../assets/register_new.png" alt="register-new" width="360">
        </div>
        <div class="col-5">
          <div class="user-accounts-form shadow p-5">
            <div class="user-accounts-form-header">
              <h2 class="title">Daftar Sekarang</h2>
              <p class="text">Sudah punya akun Tokopedia? <router-link to="/" class="link-page">Masuk</router-link></p>
            </div>
            <form @submit.prevent="submitRegister">
              <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control">
                <p class="user-input-info">Contoh: email@tokopedia.com</p>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control">
              </div>
              <button type="submit" class="btn btn-register btn-block mt-4">Daftar</button>
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
      success: false,
      message: '',
    };
  },
  methods: {
    submitRegister() {
      axios.post('http://localhost:3000/users/register', {
        email: this.email,
        password: this.password,
      })
        .then(({ data }) => {
          console.log(data);
          this.success = true;
          this.message = data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
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
.user-accounts-form-header {
  text-align: center;
  margin-bottom: 32px;
}
.user-accounts-form-header .title {
  font-weight: 600;
  font-size: 22px;
  color: rgba(0, 0, 0, .7);
  line-height: 1;
}
.user-accounts-form-header .text {
  font-size: 14px;
  color: rgba(0, 0, 0, .54);
}
.user-accounts-form-header .link-page {
  color: #42b549;
  font-weight: 600;
}

</style>

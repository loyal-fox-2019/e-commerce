<template>
  <div>
    <div class="d-flex container justify-content-center align-items-center login">
      <div class="d-flex flex-column bd-highlight mb-3 sub-login">
        <div class="p-2 bd-highlight">
          <div class="d-flex justify-content-between bd-highlight">
            <img src="../assets/logam-mulia.jpg" alt="" />
            <img src="../assets/antam.png" alt="" />
          </div>
        </div>
        <div class="p-2 bd-highlight mt-3">
          <b-card class="card">
            <b-card-text>
              <h2 class="title text-center">Admin Login</h2>
              <div class="d-flex bd-highlight mt-4 pl-2">
                <div class="p-2 w-100 bd-highlight form-login">
                  <div class="ml-4 mr-4 form">
                    <b-form @submit.prevent="login">
                      <b-form-group id="email" label="Email" class="label">
                        <b-form-input
                          v-model="email"
                          required
                          type="email"
                          placeholder="Enter your email"
                          class="input"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group id="password" label="Password" class="label">
                        <b-form-input
                          v-model="password"
                          required
                          type="password"
                          placeholder="Enter your password"
                          class="input"
                        ></b-form-input>
                      </b-form-group>
                      <b-button type="submit" variant="primary" class="indep mt-3">Login</b-button>
                    </b-form>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <div class="p-2 bd-highlight mt-3">
          <router-link to="/" class="back">
            Kembali ke Halaman Utama
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const value = {
        email: this.email,
        password: this.password,
      };
      if(this.email == 'admin@mail.com') {
        this.$store.dispatch('login', value)
          .then(({ data }) => {
            swal.fire({
              icon: 'success',
              title: 'Login Successful, Welcome',
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = '';
            this.password = '';
            localStorage.setItem('token', data.token);
            this.$store.commit('SET_LOGIN', true);
            this.$router.push('/dashboard');
          })
          .catch((err) => {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            });
          });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your email/password is wrong',
        });
      }
    },
  },
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$router.push('/');
    }
  },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');

  .login {
    height: 100vh;
    width: 70%;
    font-family: 'Hind Siliguri', sans-serif;
  }
  .back {
    color: #cb9b2d;
    font-weight: bold;
    text-decoration: underline;
  }
  .sub-login {
    width: 100%;
  }
  img {
    height: 50px;
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  }
  .title {
    color: #cb9b2d;
    font-weight: bold;
  }
  .register {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .form-login {
    border-left: 3px solid #cb9b2d !important;
  }
  .label {
    text-align: left;
    font-weight: bold;
    color: #23427e;
  }
  .btn {
    width: 210px;
    font-weight: bold;
  }
  .indep,
  .indep:focus {
    background-color: #cb9b2d !important;
    border: #cb9b2d !important;
    box-shadow: none !important;
  }
  .indep:hover {
    background-color: #927020 !important;
    border: #927020 !important;
  }
  .input {
    box-shadow: none !important;
    height: 40px;
  }
  .input:focus,
  .input:hover {
    box-shadow: none !important;
    border: 2px solid #cb9b2d;
  }
</style>

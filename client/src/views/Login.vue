<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-5">
              <div class="card-login shadow p-4">
                  <div class="">
                    <h2 style="color:black;text-align:left;">Masuk 
                        <router-link to="/register">
                        <span class="float-right" style="font-size:20px;margin-top:15px;color:#42b983">Daftar</span>
                        </router-link>
                    </h2>
                    
                  </div>
                  <b-form @submit.prevent="onSubmit">
                    <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                        description="We'll never share your email with anyone else."
                    >
                    <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.password"
                        required
                        placeholder="Enter password"
                        type="password"
                        ></b-form-input>
                    </b-form-group>    
                    <button type="submit" class="js__continue-login-form unf-user-btn unf-user-btn--medium unf-user-btn--primary unf-user-btn--block">Selanjutnya</button>                
                  </b-form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:'login',
    data(){
        return{
            form: {
                    email: '',
                    password: '',
             }
        }
    },
    methods: {
        onSubmit(evt){
            axios({
                url:'http://localhost:3000/users/login',
                method:'post',
                data: this.form
            })
            .then(({data}) => {
                this.$store.commit('setUser', data.user.name)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', data.user.name)
                this.form.email = ''
                this.form.password = ''
                this.$router.push('/')
            })
            .catch(err =>{
                    Swal.fire({
                    icon: 'error',
                    title: '',
                    text: err.response.data.message,
                    footer: '<a href>Why do I have this issue?</a>'
                    })
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-login{
    border-radius: 5px;
    background-color: white;
}
.row{
    background-image: url('https://seller.tokopedia.com/edu/wp-content/themes/tkpd-seller/src/images/op/op-toped-illustration-top.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding: 100px 0px;
}
.unf-user-btn--primary {
    border: 0;
    background: #42AD14;
    color: #fff;
    border-radius: 5px;
    padding: 8px;
    font-size: 15px;
    font-weight: 500;
}
.unf-user-btn--block {
    display: block;
    width: 100%;
}
</style>
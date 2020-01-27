<template>
     <div id="loginModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- dialog body -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <small class="text-muted">Login Into Your Account</small>
        </div>
        <!-- dialog buttons -->
        <div class="modal-body">
          <div class="form-group row">
            <div class="col-sm-12">
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
              >
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              >
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button
            data-dismiss="modal"
            type="button"
            class="btn btn-success mt-4"
            @click="login"
          >Login</button>
        </div>
        <h6 class="text-center pt-3">
          Don't have an account yet?
          <a
            href
            data-toggle="modal"
            data-target="#registerModal"
            data-dismiss="modal"
          >
            <b>Register</b>
          </a>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    login(){
      let userLogin = {
        email:this.email,
        password:this.password
      }
      axios.post('/login',userLogin)
      .then(({data}) => {
        console.log(data)
        this.$swal({
              type:'success',
              text:'Welcome Back to Perfectly'
        })
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        if(data.role == 'admin'){
          this.$store.commit('changeAdmin')
        }
        this.$store.commit('changeIsLogin')
        this.$router.push("/home");
      })
      .catch((err) => {
        console.log(err)
        this.$swal({
          type:'error',
          title: 'Failed to Login',
          text:'Wrong Email/Password'
        })
      })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.btn {
  width: 200px;
}
</style>

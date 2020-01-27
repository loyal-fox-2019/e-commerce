<template>
    <div id="registerModal" class="modal fade" >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- dialog body -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h5 class="mt-5">REGISTER</h5>
          <small class="text-muted">Please Fill in the Form</small>
        </div>
        <!-- dialog buttons -->
        <div class="modal-body">
          <div class="form-group row">
            <div class="col-sm-6">
              <input v-model="firstName" type="text" class="form-control" id="inputFirstname" placeholder="First Name">
            </div>
            <div class="col-sm-6">
              <input v-model="lastName" type="text" class="form-control" id="inputLastname" placeholder="Last Name">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center my-3">
          <button data-dismiss="modal" @click="register" type="button" class="btn btn-success">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
    data(){
        return{
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
    },
    methods:{
        register(){
          let user = {
            first_name: this.firstName,
            last_name: this.lastName,
            email:this.email,
            password:this.password
          }
          axios.post('/register',user)
          .then(({data}) => {
            this.$swal({
              type:'success',
              text:'Thanks For Registering'
            })
            this.$router.push('/')
          })
          .catch((err) => {
            console.log(err)
            this.$swal({
              type:'error',
              title: 'Failed to Register',
              text:'All Field is required'
            })
          })
          this.firstName = ''
          this.last_name = ''
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

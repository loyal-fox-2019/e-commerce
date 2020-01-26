<template>
  <div class="container text-center h-100">
      <div class="sidenav">
         <div class="login-main-text">
            <h1>Welcome<br> To FoxClothes</h1>
            <p>Login or register to style yourself up.</p>
            <img src="https://novelus.eu/wp-content/uploads/2018/04/Marketing-fashion-brands-fashion-marketing-agency-novelus.png" style="height:400px;" alt="">
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12 mx-auto my-auto">
            <div class="login-form">
               <form>
                  <div class="form-group">
                     <label>E-mail</label>
                     <input v-model="email" type="text" class="form-control" placeholder="Email">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input v-model="password" type="password" class="form-control" placeholder="Password">
                  </div>
                  <button @click="login" type="submit" class="btn btn-black mr-1">Login</button>
                  <button @click="register" type="submit" class="btn btn-secondary ml-1">Register</button>
               </form>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            email : '',
            password : ''
        }
    },
    methods : {
        login(){
            let userData = {
                email : this.email,
                password : this.password
            }
            axios.post('http://localhost:3000/user/login', userData)
            .then(({data})=>{
                console.log(data)
                localStorage.token = data.token
                localStorage.user = data.user
                swal.fire('Welcome back!')
                this.$router.push('/')
                this.$emit("login")
            })
            .catch(err =>{
                console.log(err)
                swal.fire('wrong credentials :(')
            })
        },
        register(){
            console.log('masuk register')
            this.$router.push('/register')
        }
    }

}
</script>

<style>
.main-head{
    height: 150px;
    background: #FFF;
   
}

.sidenav {
    height: 100%;
    background-color: #000;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 0px 150px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%; 
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 80%;
    }

    .register-form{
        margin-top: 20%;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
}
</style>
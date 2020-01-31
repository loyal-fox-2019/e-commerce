<template>
    <div class="fade-in">
        <!-- <h1>registrationPage</h1> -->
        <p class="japHeader">HACKCOMMERCE-8</p>

    <div id="containerPageDiv">   
        <div id="leftDiv">
            <div v-if="computedShowForm === 'registration'">
                <img class="imageLoginRegistration fade-in" src="../assets/eCommerceTheme/VQWxKr edit.jpg" alt="">
            </div>

            <div class="fade-in" v-if="computedShowForm === 'login'">
                <!-- start of login Form -->
                <div id="userFormDiv" class="card userForm  shadow-lg p-3 mb-5 bg-white rounded">
                    <h5 class="card-header text-center font-weight-bold">Login</h5>
                    <div class="card-body">

                        <form id="registrationForm" @submit.prevent="login">
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="emailRegistration" aria-describedby="emailHelp" v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="passwordRegistration" v-model="password" required>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary">login</button>
                            </div>
                        </form>

                        <div class="dropdown-divider"></div>
                        <h6 class="card-title text-center" >New User?  <a id="showRegistrationForm" href="" @click.prevent="changeForm('registration')">register</a>  now with us</h6>

                    </div>
                </div>
                <!-- end of login Form -->
            </div>

        </div>


        <div id="rightDiv">
            <div v-if="computedShowForm === 'login'">
                <img class="imageLoginRegistration fade-in" src="../assets/eCommerceTheme/191075_00_2x.jpg" alt="" style="margin-top:0">
            </div>

            <div class="fade-in" v-if="computedShowForm === 'registration'">            
                <!-- start of Registration Form -->
                <div id="userFormDiv" class="card userForm  shadow-lg p-3 mb-5 bg-white rounded">
                    <h5 class="card-header text-center font-weight-bold">Register Now</h5>
                    <div class="card-body">

                        <form id="registrationForm" @submit.prevent="register">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" id="usernameRegistration" aria-describedby="" v-model="username" placeholder="Username is permanent" required>
                            </div>
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" class="form-control" id="firstNameRegistration" aria-describedby="" v-model="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" class="form-control" id="lastNameRegistration" aria-describedby="" v-model="lastName" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="emailRegistration" aria-describedby="emailHelp" v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="passwordRegistration" v-model="password" required>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary">register</button>
                            </div>
                        </form>

                    <div class="dropdown-divider"></div>
                    <h6 class="card-title text-center" >Already registered? click <a id="showLoginForm" href="" @click.prevent="changeForm('login')">here</a> to login</h6>

                    </div>
                </div>
                <!-- end of Registration Form -->
            </div>

        </div>
    </div>

    </div>
</template>



<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'

export default {
    name: 'registrationLoginPage',
    data(){
        return {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    },
    methods:{
        setAllToDefault(){
            this.username = '',
            this.firstName = '',
            this.lastName = '',
            this.email = '',
            this.password = ''
        },
        changeForm(form){
            this.setAllToDefault()
            this.$router.push(`/user/${form}`)
        },
        login(){
            axios({
                method: 'post',
                url: '/users/login',
                data:{
                    email: this.email,
                    password: this.password
                }
            })
            .then( ({data}) =>{
                const { _id, username, firstName, lastName, fullName, email, description, profilePicture, token } = data
                console.log(`TCL: login -> data`, data)
                
                localStorage.setItem('token', token)
                swal.fire(
                    'Login Successfull',
                    `Welcome back ${data.username}`
                )
                this.$store.commit('SET_IS_LOGIN', true)
                this.$store.commit('SET_LOGGED_IN_USER_DETAIL', { _id, username, firstName, lastName, fullName, email, description, profilePicture })
                this.$router.push('/')
            })
            .catch( ({response}) =>{
                console.log(' error @login-RegistrationLoginPage \n======================\n', response.data)
                swal.fire(
                    'Error With Login',
                    response.data.message
                )
            })
        },
        register(){
            axios({
                method: 'post',
                url: '/users/register',
                data:{
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
            })
            .then( ({data}) =>{
                const { _id, username, firstName, lastName, fullName, email, token } = data

                swal.fire(
                    'Registration Successfull',
                    `Thank you for joining us ${username}`
                )
                
                localStorage.setItem('token', token)
                this.$store.commit('SET_IS_LOGIN', true)
                this.$store.commit('SET_LOGGED_IN_USER_DETAIL', { _id, username, firstName, lastName, fullName, email })
                this.$router.push('/')
            })
             .catch( ({response}) =>{
                console.log(' error @registration-RegistrationLoginPage \n======================\n', response.data)
                swal.fire(
                    'Error With Registration',
                    response.data.message
                )
            })

        }
    },
    computed:{
        computedShowForm(){
            console.log(' computed = route.params.page \n======================\n', this.$route.params.page)
            return this.$route.params.page
        }
    }

}
</script>



<style scoped>
.japHeader{
    font-family: 'Luckiest Guy', cursive;
    font-size: 2em;
    color: green;
}

label{
    /* border:2px red solid; */
    float: left;
    margin-left: 1%;
    
}


#userFormDiv{
    /* border: solid 2px red; */
    margin:auto;
    width: 30vw
}


#containerPageDiv{
    /* border: solid 3px black; */
    display: flex;
    margin:auto;
    width: 90%;
    height:80%;
}  
#leftDiv{
    /* border: solid 2px red; */
    width:50%;
}
#rightDiv{
    /* border: solid 2px blue; */
    width:50%
}

.imageLoginRegistration{
    /* border:solid red 2px; */
    position: relative;
    width:100%;
    height: auto;
    /* top: 15%; */
    margin-top:5%;
}





</style>
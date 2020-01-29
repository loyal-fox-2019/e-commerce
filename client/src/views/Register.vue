<template>
  <div class="container">
        <div class="row main-regis">
            <div class="main-login main-center">
            <h4>Welcome! Let us know who you are</h4>
                <form class="" method="post" action="#">
                    
                    <div class="form-group">
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"></span>
                                <input v-model="name" type="text" class="form-control form-control-regis" name="name" id="name"  placeholder="Enter your name"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">+62</span>
                                <input v-model="phone" type="text" class="form-control form-control-regis" name="username" id="username"  placeholder="Enter your phone number"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <input v-model="address" type="text" class="form-control form-control-regis" name="username" id="username" placeholder="Enter your address"/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"></span>
                                <input v-model="email" type="email" class="form-control form-control-regis" name="username" id="username"  placeholder="Enter your email"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"></span>
                                <input v-model="password" type="password" class="form-control form-control-regis" name="password" id="password"  placeholder="Enter your password"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"></span>
                                <input v-model="confirmPassword" type="password" class="form-control form-control-regis" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group ">
                        <a @click="register" target="_blank" type="button" id="button" class="btn btn-primary btn-lg btn-block login-button">Register</a>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            name : '',
            phone : '',
            address : '',
            email : '',
            password : '',
            confirmPassword : ''
        }
    },
    methods : {
        register(){
            if(this.password !== this.confirmPassword){
                swal.fire('Password doesnt match!')
                return
            }

            let userData = {
                name : this.name,
                phone : this.phone,
                address : this.address,
                email : this.email,
                password : this.password
            }

            axios.post('http://54.179.171.81/user/register', userData)
            .then(({data})=>{
                console.log(data)
                swal.fire('Welcome!  ^^')
                this.$router.push('/')
                this.$emit('login')
            })
        }
    }

}
</script>

<style>
#playground-container {
    height: 500px;
    overflow: hidden !important;
    -webkit-overflow-scrolling: touch;
}

.main-regis{
 	margin:50px 15px;
}

h1.title { 
	font-size: 50px;
	font-family: 'Passion One', cursive; 
	font-weight: 400; 
}

hr{
	width: 10%;
	color: #fff;
}

label{
	margin-bottom: 15px;
}

.main-login{
 	background-color: #fff;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

}
.form-control-regis {
    height: auto!important;
    padding: 8px 12px !important;
}

#button {
    border: 1px solid #ccc;
    margin-top: 28px;
    padding: 6px 12px;
    color: #666;
    text-shadow: 0 1px #fff;
    cursor: pointer;
    -moz-border-radius: 3px 3px;
    -webkit-border-radius: 3px 3px;
    border-radius: 3px 3px;
    -moz-box-shadow: 0 1px #fff inset, 0 1px #ddd;
    -webkit-box-shadow: 0 1px #fff inset, 0 1px #ddd;
    box-shadow: 0 1px #fff inset, 0 1px #ddd;
    background: #f5f5f5;
    background: -moz-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f5), color-stop(100%, #eeeeee));
    background: -webkit-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -o-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -ms-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#eeeeee', GradientType=0);
}
.main-center{
 	margin-top: 30px;
 	margin: 0 auto;
 	max-width: 400px;
    padding: 10px 40px;
	background:#2a2a2a;
	    color: #FFF;
    text-shadow: none;
	-webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
-moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);

}
span.input-group-addon i {
    color: #ffffff;
    font-size: 17px;
}

.login-button{
	margin-top: 5px;
}

.login-register{
	font-size: 11px;
	text-align: center;
}

</style>
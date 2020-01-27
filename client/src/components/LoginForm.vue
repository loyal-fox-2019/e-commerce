<template>
    <div class="login clearfix">
        <form class="login-form">
            <input class="input-login" id="login-email" type="text" placeholder="email" required>
            <input class="input-login" type="password" placeholder="password" required>
            <a href="#" class="btn btn-animation">Login</a>
            <span class="link-register" >Not registered ? <a href="#">Create an account</a></span>
        </form>
    </div>
</template>

<style scoped>

.clearfix, 
.clearfix:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
}

.login{
  position: relative
}

.login-form {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  display:flex;
  flex-direction: column;
  padding: 50px;
  width: 20%;
  border-radius : 1px;
  color: #2d3436; 
  font-size: 16px;
  box-shadow: 0 10px 40px;
  text-align: center;
}

.input-login {
  margin-bottom: 20px;
  border-radius: 1px;
  padding: 12px
}

.link-register {
  font-size: 12px;
}
</style>
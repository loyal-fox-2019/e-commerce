<template>
    <div class="register">
        <div class="register-title">
            <span>register now</span>
        </div>
        <form class="form-register clearfix">
            <input class="register-input" type="text" placeholder="full name">  
            <input class="register-input" type="email" placeholder="email">  
            <input class="register-input" type="password" placeholder="password">  
            <a class="btn" href="#">register</a>
        </form>
        <div class="oauth-signin">
            <a class="btn-oauth" href="#"><i></i><span>google</span></a>
            <a class="btn-oauth" href="#"><i></i><span>facebook</span></a>
        </div>
    </div>
</template>

<style scoped>
.register-title{
    margin-bottom: 20px;
    text-transform: uppercase;
 
}

.register {
    padding: 50px;
    box-shadow: 0 10px 30px;
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
    text-align: center;
}

.register-input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 20px
}

.form-register{
    display: flex;
    flex-direction: column;
    text-align: center;
}

.oauth-signin {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.btn-oauth:link,
.btn-oauth:visited {
    border-radius: 10px;
    padding: 20px 30px; 
    border: 1px solid #2d3436 
}

.btn-oauth:active{
    transform: translateY(1px);
    box-shadow: 0 10px 10px;
}
</style>
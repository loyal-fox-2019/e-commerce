<template>
  <div id="ini">
    <RegisterForm/>
    <!-- <img src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="online pict"> -->
    <img src="../assets/bgimage.jpeg" alt="on assets"> 
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
export default {
  name: "Login",
  components: {
    RegisterForm
  }
};
</script>

<style scoped>
img{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -10;
    top: 0;
    left: 0;
}
#ini{
  background: url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')
}
</style>
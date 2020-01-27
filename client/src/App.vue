<template>
  <div id="app">
    <div id="nav">
      <navBar></navBar>
    </div>
    <div id="routerView1">
      <router-view/>
    </div>
    <div id="footerContainer">
      <div id="footerContent">
        &copy; hacktivcommerce8 - jap hendy wijaya
      </div>
    </div>
    
    <!-- SAMPLE -->
    <div style="visibility: hidden">
        <p style="font-family: 'Mukta', sans-serif;">1 HACKCOMMERCE-8</p>
        <p style="font-family: 'Source Code Pro', monospace;">2 HACKCOMMERCE-8</p>
        <p style="font-family: Varela Round', sans-serif;">3 HACKCOMMERCE-8</p>
        <p style="font-family: 'Cairo', sans-serif;">4 HACKCOMMERCE-8</p>
        <p style="font-family: Righteous', cursive;">5 HACKCOMMERCE-8</p>
        <p style="font-family: 'Luckiest Guy', cursive;;">6 HACKCOMMERCE-8</p>
    </div>
    <!-- END OF SAMPLE -->
  </div>
</template>


<script>
import navBar from './components/navBar'

export default {
  name: 'App',
  components:{
      navBar
  },
  created(){
    
  }
    




}
</script>




<style>
@import url('https://fonts.googleapis.com/css?family=Cairo|Luckiest+Guy|Mukta|Righteous|Source+Code+Pro|Varela+Round&display=swap');
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

#app {
  /* border:solid 4px blue; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:130vh;
  overflow: hidden;
}

#routerView1{
  /* border: solid 3px red; */
  height:100vh
}

#footerContainer{
  position: relative;
  border-top: solid 2px grey;
  background: rgba(26, 15, 0, 0.952);
  width: 100%;
  bottom: 0;
  height: 30%;
}
#footerContent{
  /* border:solid 2px red; */
  position: relative;
  top:20%;
  color:rgba(211, 214, 211, 0.753);
  /* font-family: 'Varela Round', sans-serif; */
}




.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
  
}

@keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-moz-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-webkit-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-o-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}


</style>

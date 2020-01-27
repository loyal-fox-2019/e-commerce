<template>
    <div class="container">
    <div class="card border-0 shadow my-5">
      <div class="card-body p-5">
        <h2
        class="subheading"
        style="color:white;background-color:black;"
      >Perfectly</h2>
      <h4
        class="subheading"
        style="color:white;border:solid black; background-color:black;margin-top:30%;"
      >Find Your Perfect Art Design and Illustration From Prodigy Designer</h4>
    </div>
    </div>
    <button type="button" class="btn btn-outline-dark" @click="goShop"><i class="fas fa-shopping-cart"></i> Shop Now</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'Landing',
  methods:{
    goShop(){
      if(this.isLogin){
        this.$router.push('/home')
      } 
      else {
        this.$swal({
              type:'warning',
              title: 'You Must Login First',
        })
      }
    }
  },
  computed:{
    ...mapState(['isLogin'])
  }
}
</script>


<style scoped>
.card{
    background-image:url('https://cdn.dribbble.com/users/2238887/screenshots/5581424/design_team_4x.png');
    background-size: 1050px 750px;
}
</style>
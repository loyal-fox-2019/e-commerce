<template>
  <div class="button-group">
    <button @click="seeCart" type="button" class="btn btn-dark btn-circle btn-xl"><i class="ml-2 fa fa-shopping-cart"></i>
        <span class="badge badge-dark">{{cartNum}}</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      cartNum : 1
    }
  },
  methods : {
    seeCart(){
      console.log('tombol FAB dipencet')
      this.$router.push('/cart')
    }
  },
  created(){
  }
}
</script>

<style>
.btn-circle.btn-xl {
    width: 100px;
    height: 100px;
    padding: 10px 16px;
    border-radius: 55px;
    font-size: 24px;
    line-height: 1.33;
}

.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
    position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
}

</style>
<template>
    <div class="container-fluid">
    <div class="row">
      <div class="col-2 py-5 border-right" id="panel">
        <h4 class="mb-5">Admin Menu</h4>
        <button type="button" class="btn btn-outline-dark" @click="goProduct">Add Product</button>
        <button type="button" class="btn btn-outline-dark my-2" @click="goOverview">Overview</button>
        <button type="button" class="btn btn-outline-dark my-2" @click="goTransaction">Transaction</button>
      </div>
      <div class="col-6 my-4">
        <router-view></router-view>
      </div>
      <div class="col-4">
        <BarChart/>
        <BarChart2/>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart.vue'
import BarChart2 from '../components/BarChart2.vue'

export default {
    components:{
      BarChart,
      BarChart2
    },
    methods:{
        goProduct(){
            this.$router.push('/admin/addProduct')
        },
        goOverview(){
             this.$router.push('/admin/overview')
        },
        goTransaction(){
            this.$router.push('/admin/transaction')
        }
    },
    mounted(){
      if(!localStorage.getItem('token') && localStorage.getItem('role')!== 'admin'){
        this.$router.push('/')
      }
    }
}
</script>

<style>
#panel {
  flex-direction: column;
  align-items: center;
  height: 150vh;
}
</style>

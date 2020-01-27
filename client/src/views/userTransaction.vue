<template>
    <div>
    <div v-if="transactions.length !== 0" class="container my-4">
    <!-- <div v-if="transactions.length !== 0" class="container my-4"> -->
    <div class="row">
        <div class="col-4">
        <h1 class="pb-4">Transaction Status</h1>
        <userTransaction v-for="transaction in transactions" :key="transaction._id" :history="transaction" v-on:setUpdate="updateTransaction" v-on:setDetail="showDetail"></userTransaction>
        </div>
        <div class="col-8">
        <br>
        <br>
        <br>
        <router-view :detail="detailTransaction"></router-view>
        </div>
     </div>
    </div>
     <div v-else class="container">
    <div class="row">
      <div class="col-8">
          <img src="https://cdn.dribbble.com/users/1003768/screenshots/4756331/payment-failure-dribbble-yatish-asthana.png" alt="" srcset="" height="500">
      </div>
      <div class="col-4 text-center mt-5">
        <h5>Your Have No Transaction</h5>
        <p>Explore Our Products!</p>
        <button type="button" class="btn btn-outline-dark" @click="goShop"><i class="fas fa-shopping-cart"></i> Shop Now</button>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import userTransaction from '../components/History'
import axios from '@/api/server'

export default {
    name:'UserTransaction',
    data(){
        return{
            transactions:[],
            detailTransaction:{}
        }
    },
    components:{
        userTransaction
    },
    methods:{
        goShop(){
          this.$router.push('/home')
        },
        showDetail(id){
            axios
                .get(`/transactions/user/${id}`, {
                    headers: { "access-token": localStorage.getItem("token") }
                })
                .then(({ data }) => {
                   this.detailTransaction = data
                   console.log(data)
                   this.$router.push(`/mytransaction/${id}`)
                })
                .catch(err => {
                    console.log(err);
                });  
        },
        updateTransaction(id){
            const value = {}
            axios
                .put(`/transactions/${id}`,value,{
                    headers:{"access-token":localStorage.getItem("token")}
                })
                .then(({ data }) => {
                   this.generate()
                   this.$swal({
                        type:'success',
                        text:'Thanks for the confirmation, Hope You Enjoy Shopping Here..'
                    })
                })
                .catch(err => {
                     this.$swal({
                        type:'error',
                        text:'Failed To Update Status'
                    })
                    console.log(err);
                });
        },
        generate(){
            axios
                .get(`/transactions/user`, {
                    headers: { "access-token": localStorage.getItem("token") }
                })
                .then(({ data }) => {
                   this.transactions = data
                   console.log(data)
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
    created(){
        this.generate()
    }
}
</script>

<style scoped>

</style>

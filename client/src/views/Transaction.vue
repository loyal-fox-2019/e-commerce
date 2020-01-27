<template>
    <div class="container my-2">
        <h1>All User Transaction</h1>
        <div class="card my-4" v-for="history in transactions" :key="history._id">
           <h5 class="card-header">Transaction</h5>
           <div class="card-body">
             <div class="row justify-content-between">
             <p class="mx-4">ID : {{history._id}} </p>
            </div>
            <div class="row">
              <p class="mx-4">created at: {{history.created_at.slice(0,10)}}</p>
            </div>
            <div class="row">
              <p class="mx-4">customer name: {{history.userId.first_name}} {{history.userId.last_name}}</p>
            </div>
            <div class="row">
              <p class="mx-4">Delivery Address: {{history.address}}</p>
            </div>
             <div class="row">
              <p class="mx-4" v-if="history.status == 'Received'" style="color:green;"><span style="color:black;">Status: </span>{{history.status}}</p>
              <p class="mx-4" v-else style="color:red;"><span style="color:black;">Status: </span>{{history.status}}</p>
            </div>
            <div class="row">
                <p class="mx-4">Total Purchase: ${{history.price}}</p>
            </div>
          </div>
    </div>
    </div>
</template>

<script>
import userTransaction from '../components/History'
import axios from '@/api/server'

export default {
    name:'Transaction',
    data(){
        return{
            transactions:[]
        }
    },
    methods:{
         generate(){
            axios
                .get(`/transactions`, {
                    headers: { "access-token": localStorage.getItem("token") }
                })
                .then(({ data }) => {
                   this.transactions = data
                   console.log(data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created(){
        this.generate()
    }
}
</script>

<style>

</style>

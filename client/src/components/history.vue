<template>
    <div class="container" v-if="history.length>0">
            <h4>My History</h4>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in history" :key="item._id">
                <td>{{ item.productId.name }}</td>
                <td>{{ item.productId.price }}</td>
                <td>{{ item.Quantity }}</td></tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'history',
    data(){
        return{
            history:[]
        }
    },
    created(){
        axios({
            method: 'get',
            url: 'http://35.240.228.104:3000/cart/history',
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            // console.log(data)
            this.history = data
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style>

</style>
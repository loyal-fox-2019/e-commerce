<template>
  <div>
        <navbar></navbar>
        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody v-if="listCart.length>0">
                    <tr v-for="cart in listCart" :key="cart._id">
                    <td>{{ cart.productId.name }}</td>
                    <td>{{ cart.productId.price }}</td>
                    <td><input type="checkbox" :id="cart._id" :value="cart" v-model="checkedCart"></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Price: </th>
                        <th>{{ totalPrice }}</th>
                        <th><button type="button" class="btn btn-warning" v-on:click.prevent="checkout">Warning</button></th>
                    </tr>
                </tfoot>
            </table>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from '../components/navbar'
export default {
    name: 'cart',
    components: {
        navbar
    },
    data(){
        return{
            listCart: [],
            checkedCart: [],
            totalPrice: 0,
            cartIdList: [],
            user: localStorage.getItem('user')
        }
    },
    watch: {
        checkedCart: function (val) {
            console.log('masuk watch checkedCart')
            this.cartIdList = []
            let price = 0
            for(let item of val){
                let total = item.productId.price * item.Quantity
                price+=total
                this.cartIdList.push(item._id)
            }
            this.totalPrice = price
        },
         $route: function(){
             console.log('masuk watch $route')
            axios({
            method: 'get',
            url: `http://localhost:3000/cart`,
            headers:{
                token: localStorage.getItem('token')
            }
            })
            .then(({data})=>{
                console.log(data)
                this.listCart = data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
        console.log('masuk created')
        axios({
            method: 'get',
            url: `http://localhost:3000/cart`,
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            console.log(data)
            this.listCart = data
        })
        .catch(err=>{
            console.log(err)
        })
    },
    methods:{
        checkout(){
            axios({
                method: 'delete',
                url: `http://localhost:3000/cart`,
                headers:{
                    token: localStorage.getItem('token'),
                    cartList: this.cartIdList
                }
            })
            .then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
<template>
  <div>
        <navbar></navbar>
        <div class="container">
            <router-link :to="`/user/cart/history`">History</router-link>
            <h4>My Cart</h4>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Options</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody v-if="listCart.length>0">
                    <tr v-for="cart in listCart" :key="cart._id">
                    <td>{{ cart.productId.name }}</td>
                    <td>{{ cart.productId.price }}</td>
                    <td>{{ cart.Quantity }}</td>
                    <td><input type="checkbox" :id="cart._id" :value="cart" v-model="checkedCart"></td>
                    <td><button type="button" class="btn btn-danger" v-on:click.prevent="deleteCart(cart._id)">delete</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Price: </th>
                        <th>{{ totalPrice }}</th>
                        <th><button type="button" class="btn btn-warning" v-on:click.prevent="checkout">Check Out</button></th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <router-view></router-view>
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
            user: localStorage.getItem('user'),
            history:[]
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
                // console.log(item._id)
                this.cartIdList.push(item)
            }
            this.totalPrice = price
        },
         $route: function(){
             console.log('ruuuuteee')
            this.getCarts()
        }
    },
    created(){
        this.getCarts()
    },
    methods:{
        deleteCart(cart_id){
            axios({
                method: 'delete',
                url: `http://localhost:3000/cart/${cart_id}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data)
                this.getCarts()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getCarts(){
            console.log('masuk')
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
        checkout(){
            console.log(this.cartIdList)
            axios({
                method: 'patch',
                url: `http://localhost:3000/cart`,
                headers:{
                    token: localStorage.getItem('token'),
                },
                data:{
                    cartList: this.cartIdList
                }
            })
            .then(({data})=>{
                console.log(data, 'updated==============harusnya 2 kali')
                this.getCarts()
                this.totalPrice = 0
                console.log(data, 'stock sudah berkurang')
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
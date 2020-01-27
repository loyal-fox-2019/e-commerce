<template>
    <table class="table table-bordered table-dark">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Brand</th>
                <th scope="col">Type</th>
                <th scope="col">Price/Set</th>
                <th scope="col">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cart, i) in carts" :key="i">
                <td style="text-align:center; padding: 25px 0 25px 0 !important;">
                    <i class="fas fa-trash i-trash" 
                    v-on:click="deleteCart(cart._id)"
                    style="cursor: pointer;"></i>
                </td>
                <td class="table-data">{{cart.productId.brand}}</td>
                <td class="table-data">{{cart.productId.type}}</td>
                <td class="table-data">Rp.{{cart.productId.price}}</td>
                <td class="table-data">{{cart.amount}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'cartTable',
    props: ['carts'],
    data() {
        return {
            cartsTable: []
        }
    },
    methods: {
        deleteCart: function(id) {
            axios({
                method: 'delete',
                url: `http://localhost:3000/cart/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(respond => {
                swal.fire({
                    icon: 'success',
                    title: 'Delete cart item success'
                })
               // this.$router.push({path: '/wheels'})
               //emit si delete-item di org tua
            })
            .catch(error => {
                const errorRespond = {error};
                console.log(errorRespond);
            })
        },
    }
}
</script>

<style>
.table-data {
    padding: 25px 0 25px 25px !important;
}
.i-trash {
    font-size: 23px;
    color: red;
    text-align: center;
}
</style>
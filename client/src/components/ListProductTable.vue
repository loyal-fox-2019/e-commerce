<template>
    <table class="table table-bordered table-dark">
        <thead>
            <tr>
                <th></th>
                <th scope="col">Brand</th>
                <th scope="col">Type</th>
                <th scope="col">Stock</th>
                <th scope="col">Price/set</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, i) in products" :key="i">
                <td style="padding-right: 0 !important; padding-left: 40px;">
                    <i class="fas fa-trash mr-5" 
                    style="color: red; font-size: 20px; cursor: pointer;"
                    v-on:click.prevent="deleteProduct(product._id)"></i>
                    <router-link :to="{path: `/edit-product/${product._id}`}">
                        <i class="fas fa-edit" style="position: relative; bottom: 2px; font-size: 20px;"></i>
                    </router-link>
                </td>
                <td>{{product.brand}}</td>
                <td>{{product.type}}</td>
                <td>{{product.stock}}</td>
                <td>{{product.price}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'listProductTable',
    props: ['products'],
    methods: {
        deleteProduct: function(id) {
            axios({
                method: 'delete',
                url: `http://localhost:3000/product/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                swal.fire({
                    icon: 'success',
                    title: 'Product has been deleted'
                })
                this.$router.push({path: '/'});
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>
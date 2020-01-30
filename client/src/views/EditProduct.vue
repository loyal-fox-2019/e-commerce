<template>
    <div id="editProduct">
        <div class="container-fluid">
            <div class="row justify-content-center" style="margin-top: 110px;">
                <div class="col-lg-5">
                    <div class="form-card">
                        <form v-on:submit.prevent="updateProduct()">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Brand</label>
                                <input type="text" class="form-control" v-model="brand">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Type</label>
                                <input type="text" class="form-control" v-model="type">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Stock</label>
                                <input type="number" class="form-control" v-model="stock">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Price</label>
                                <input type="number" class="form-control" v-model="price">
                            </div>
                            <div class="button-container mt-4">
                                <button type="submit" class="btn btn-dark btn-lg" style="width: 100%;">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
export default {
    name: 'editProduct',
    data() {
        return {
            id: '',
            brand: '',
            type: '',
            stock: 0,
            price: 0,
        }
    },
    created() {
        axios({
            method: 'get',
            url: `http://localhost:3000/product/${this.$route.params.id}`,
        })
        .then(respond => {
            const product = respond.data.data;
            this.id = product._id;
            this.brand = product.brand;
            this.type = product.type;
            this.stock = product.stock;
            this.price = product.price;
        })
        .catch(error => {
            const errorRespond = {error};
        })
    },
    methods: {
        updateProduct: function() {
            axios({
                method: 'put',
                url: `http://localhost:3000/product/${this.id}`,
                data: {
                    brand: this.brand,
                    type: this.type,
                    stock: this.stock,
                    price: this.price
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                swal.fire({
                    icon: 'success',
                    title: 'Update successful'
                })
                this.$router.push({path: '/list-product'});
            })
            .catch(error => {
                console.log({error});
            })
        }
    }
}
</script>

<style scoped>
.form-card {
    padding: 40px 80px;
}
</style>
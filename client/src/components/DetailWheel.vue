<template>
    <div class="card card-detail">
        {{getProduct}}
        <div class="card-body">
            <img class="img-responsive card-img-top" 
            v-bind:src="product.productImage"
            style="width:100%;"/>
            <div class="card-content">
                <h2>{{product.brand}}</h2>
                <h4>{{product.type}}</h4>
                <p>{{product.description}}</p>
                <h4 class="mt-3">Stock: {{product.stock}} set</h4>
                <h4>Price: Rp{{product.price}}/set</h4>
                <form style="padding-right: 501px;" v-on:submit.prevent="addToCart(product._id)">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Amount</label>
                        <input type="number" class="form-control" v-model="amount" placeholder="Input Amout to buy">
                    </div>
                    <button class="btn btn-lg btn-dark">Add to cart</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'detailWheel',
    data() {
        return {
            product: {},
            amount: 0
        }
    },
    computed: {
        getProduct: function() {
            axios({
                method: 'get',
                url: `http://localhost:3000/product/${this.$route.params.wheel_id}`
            })
            .then(respond => {
                let product = respond.data.data
                if(!product.description) {
                    product.description = ''
                } 
                this.product = product
            })
            .catch(error => {
                console.log({error});
            })
        }
    },
    methods: {
        addToCart: function(id) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/cart',
                data: {
                    productId: id,
                    amount: this.amount
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(respond => {
                swal.fire({
                    icon: 'success',
                    title: 'Add to cart successful'
                })
                this.$router.push({path: '/cart'})
            })
            .catch(error => {
                const errorRespond = {error};
                if(Array.isArray(errorRespond.error.response.data.errors)) {
                    swal.fire({
                    icon: 'error',
                    title: 'Add to cart failed',
                    text: `${errorRespond.error.response.data.errors[0]}`
                    }) 
                } else {
                    if(errorRespond.error.response.data.errors === 'jwt malformed') {
                        errorRespond.error.response.data.errors = 'You have to login first'
                    }
                    swal.fire({
                    icon: 'error',
                    title: 'Add to cart failed',
                    text: `${errorRespond.error.response.data.errors}`
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.card-content{
    padding-left: 10px;
    padding-bottom: 20px;
}
</style>
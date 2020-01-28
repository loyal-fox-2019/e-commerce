<template>
    <div id="product-detail">
        <b-card :img-src="product.image" img-alt="Card image" img-left class="mb-3">
            <b-card-text class="product-info">
                <h3>{{product.name}}</h3>
                <div id="product-price">${{product.price}}</div>
                <div id="product-price">Seller: {{product.seller.username}}</div>
                <br>
                <form @submit.prevent="">
                    Quantity: <input class="form-control" id="qty-input" type="number" v-model="quantity" min="1" :disabled="product.seller.username==this.$cookies.get('username')">
                    <b-button class="btn btn-danger" type="submit" :disabled="product.seller.username==this.$cookies.get('username')" @click="addToCart">Add to cart</b-button>
                    <div v-if="product.seller.username==this.$cookies.get('username')">You are selling this product.</div>
                    <div>{{addMessage}}</div>
                </form>
            </b-card-text>
        </b-card>
        <div v-html="product.description"></div>
    </div>
</template>

<script>
import axiosReq from "../config/axios";
    export default {
        name: "productDetail",
        props: {
            product: Object
        },
        data() {
            return {
                quantity: 1,
                addMessage: ""
            }
        },
        methods: {
            addToCart() {
                axiosReq({
                    url: "/users/cart",
                    method: "post",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        product: this.product._id,
                        quantity: this.quantity
                    }
                })
                .then(() => {
                    this.addMessage = "Added to cart!"
                })
                .catch((err) => {
                    this.addMessage = err.response.data.msg
                })
            }
        }
    }
</script>

<style scoped>
#product-detail {
    padding-left: 15px;
    padding-top: 15px;
    width: calc(100vw - 270px);
    text-align: left;
}

img {
    width: 200px;
    object-fit: contain;
    padding: 15px;
}

.product-info {
    text-align: left;
}
#qty-input {
    width: 150px;
}
</style>
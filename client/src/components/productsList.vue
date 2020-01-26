<template>
    <div id="cart-list">
        <h3>Shopping Cart</h3>
        <div v-if="productsArr.length > 0">
            <table class="table">
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="item in productsArr" :key="item.product._id" :id="item._id">
                    <td><img :src="item.product.image" alt="Product image" class="cart-image"></td>
                    <td>
                        <router-link :to="'/product/'+item.product._id">{{item.product.name}}</router-link><br>
                        Seller: {{item.product.seller.username}}
                    </td>
                    <td>
                        {{item.quantity}}<br>
                        <div v-if="item.quantity > item.product.stock" style="color:red">Quantity in your cart exceeds stock!</div>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="deleteItem(item._id)">Delete item</button><br>
                        <button class="btn btn-primary">Change quantity</button>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            Your cart is empty.
        </div>
    </div>
</template>

<script>
    import JQuery from 'jquery';
    const $ = JQuery;
    import axiosReq from "../config/axios";
    export default {
        name: "productsList",
        props: {
            productsArr: Array
        },
        methods: {
            deleteItem(cartId) {
                axiosReq({
                    url: "/users/cart",
                    method: "delete",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        cartId: cartId
                    }
                })
                .then(()=> {
                    $(`#${cartId}`).hide();
                })
                .catch((err) => {
                    console.log(err);
                    
                })
            }
        }
    }
</script>

<style scoped>
#cart-list {
    padding-left: 15px;
    padding-top: 15px;
    width: calc(100vw - 270px);
    text-align: left;
}

.cart-image {
    max-width: 200px;
    max-height: 200px;
}

.table {
    width: 80%;
}
</style>
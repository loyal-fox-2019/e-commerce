<template>
    <div id="product-detail">
        <b-card :img-src="product.image" img-alt="Card image" img-left class="mb-3">
            <b-card-text class="product-info">
                <h3>{{product.name}}</h3>
                <div id="product-price">${{product.price}}</div>
                <div id="product-price">Seller: {{product.seller.username}}</div>
                <br>
                <form @submit.prevent="">
                    Quantity: <input class="form-control" id="qty-input" type="number" v-model="quantity" min="1">
                    <button class="btn btn-danger" type="submit">Add to cart</button>
                </form>
            </b-card-text>
        </b-card>
        <div>{{product.description}}</div>
    </div>
</template>

<script>
    export default {
        name: "productDetail",
        props: {
            product: Object
        },
        data() {
            return {
                quantity: 1
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
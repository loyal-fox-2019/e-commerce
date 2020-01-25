<template>
    <div>
        <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 15rem;"
            class="mb-2 productcard"
        >
            <b-card-text class="product-info">
                <a href="#">Product Name</a><br>
                <div class="product-price">$5<br></div>
                Sold: 100
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "productCard"
    }
</script>

<style scoped>
.productcard {
    margin: 5px;
}
.product-info {
    text-align: left;
}
.product-price {
    color: rgb(255, 166, 0);
}
</style>
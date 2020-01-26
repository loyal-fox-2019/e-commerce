<template>
    <div id="products-view">
        <h3>{{title}}</h3>
        <div v-if="productsArr.length > 0">
            <b-card-group column>
                <productCard v-for="product in productsArr" :key="product._id" :product="product" :mode="mode"></productCard>
            </b-card-group>
        </div>
        <div v-else-if="isLogin">You have not added a product!</div>
        <div v-else>Please login first.</div>
    </div>
</template>

<script>
    import productCard from "../components/productCard.vue"
    export default {
        name: "ProductsView",
        props: {
            productsArr: Array,
            title: String,
            mode: String
        },
        components: {
            productCard
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            }
        }
    }
</script>

<style scoped>
#products-view {
    padding-left: 15px;
    padding-top: 15px;
    width: calc(100vw - 270px)
}
h3 {
    text-align: left;
}
</style>
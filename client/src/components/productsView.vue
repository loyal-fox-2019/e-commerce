<template>
    <div id="products-view">
        <h3>Products</h3>
        <b-card-group column>
            <productCard></productCard>
            <productCard></productCard>
            <productCard></productCard>
            <productCard></productCard>
            <productCard></productCard>
            <productCard></productCard>
            <productCard></productCard>
            <productCard></productCard>
        </b-card-group>
    </div>
</template>

<script>
    import productCard from "../components/productCard.vue"
    export default {
        name: "ProductsView",
        components: {
            productCard
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
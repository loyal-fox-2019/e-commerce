<template>
    <div>
        <manageSidebar></manageSidebar>
        <productsList id="products-list"></productsList>
    </div>
</template>

<script>
    import axiosReq from "../config/axios.js";
    import manageSidebar from "../components/manageSidebar.vue"
    import productsList from "../components/productsList.vue"
    export default {
        name: "MyProductsPage",
        components: {
            manageSidebar,
            productsList
        },
        data() {
            return {
                productsArr: []
            }
        },
        created() {
            axiosReq({})
        }
    }
</script>

<style scoped>
#products-list {
    left: 250px;
    position: absolute;
}
</style>
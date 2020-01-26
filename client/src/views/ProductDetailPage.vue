<template>
    <div>
        <categorySidebar></categorySidebar>
        <productDetail id="product-detail" :product="product"></productDetail>
    </div>
</template>

<script>
    import productDetail from "../components/productDetail.vue";
    import categorySidebar from "../components/categorySidebar.vue";
    import axiosReq from "../config/axios";
    export default {
        name: "ProductDetailPage",
        data() {
            return {
                product: null
            }
        },
        components: {
            categorySidebar,
            productDetail
        },
        created() {
            axiosReq({
                url: `/products/${this.$route.params.id}`,
                method: 'get'                
            })
            .then(({data}) => {
                this.product = data;
            })
            .catch((err) => {
                console.log(err);
                
            })
        }
    }
</script>

<style scoped>
#product-detail {
    left: 250px;
    position: absolute;
}
</style>
<template>
    <div>
        <manageSidebar></manageSidebar>
        <editProductForm id="edit-product-form" :product="product" v-if="product"></editProductForm>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
    import axiosReq from "../config/axios.js";
    import manageSidebar from "../components/manageSidebar.vue"
    import editProductForm from "../components/editProductForm.vue";
    
    export default {
        name: "EditProductPage",
        components: {
            manageSidebar,
            editProductForm
        },
        data() {
            return {
                product: null
            }
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
#edit-product-form {
    left: 250px;
    position: absolute;
    width: calc(100vw - 250px)
}
</style>
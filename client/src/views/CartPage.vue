<template>
    <div>
        <categorySidebar></categorySidebar>
        <productsList id="cart-list" :productsArr="productsArr" v-if="!loading"></productsList>
    </div>
</template>

<script>
    import categorySidebar from "../components/categorySidebar.vue";
    import productsList from "../components/productsList.vue";
    import axiosReq from '../config/axios';
    
    export default {
        name: "CartPage",
        components: {
            categorySidebar,
            productsList
        },
        data() {
            return {
                productsArr: null,
                loading: true
            }
        },
        created() {
            axiosReq({
                url: "/users/cart",
                method: "get",
                headers: {
                    token: this.$cookies.get('token')
                }
            })
            .then(({data}) => {
                this.productsArr = data;
                this.loading = false;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
#cart-list {
    left: 250px;
    position: absolute;
}
</style>
<template>
    <div>
        <manageSidebar></manageSidebar>
        <productsView id="products-view" :productsArr="productsArr" :title="'My products'" :mode="'manage'"></productsView>
    </div>
</template>

<script>
    import axiosReq from "../config/axios.js";
    import manageSidebar from "../components/manageSidebar.vue"
    import productsView from "../components/productsView.vue"
    export default {
        name: "MyProductsPage",
        components: {
            manageSidebar,
            productsView
        },
        data() {
            return {
                productsArr: []
            }
        },
        created() {
            axiosReq({
                url: `/users/myproducts`,
                method: 'get',
                headers: {
                    token: this.$cookies.get('token')
                },
            })
            .then(({data}) => {
                this.productsArr = data;
            })
            .catch((err) => {
                console.log(err);
                
            })
        }
    }
</script>

<style scoped>
#products-view {
    left: 250px;
    position: absolute;
}
</style>
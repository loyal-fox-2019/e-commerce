<template>
    <div>
        <categorySidebar></categorySidebar>
        <productsView id="products-view" :productsArr="productsArr" :title="'Products'" :mode="'list'" :loading="loading"></productsView>
    </div>
</template>

<script>
    import categorySidebar from "../components/categorySidebar.vue"
    import productsView from "../components/productsView.vue"
    import axiosReq from "../config/axios";
    export default {
        name: "MainPage",
        data() {
            return {
                productsArr: [],
                searchStr: "",
                loading: true
            }
        },
        components: {
            categorySidebar,
            productsView
        },
        created() {
            axiosReq({
                url: `/products?search=${this.searchStr}`,
                method: 'get'                
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
#products-view {
    left: 250px;
    position: absolute;
}
</style>
<template>
    <div>
        <categorySidebar></categorySidebar>
        <productsView id="products-view"></productsView>
    </div>
</template>

<script>
    import categorySidebar from "../components/categorySidebar.vue"
    import productsView from "../components/productsView.vue"
    export default {
        name: "MainPage",
        components: {
            categorySidebar,
            productsView
        },
        
    }
</script>

<style scoped>
#products-view {
    left: 250px;
    position: absolute;
}
</style>
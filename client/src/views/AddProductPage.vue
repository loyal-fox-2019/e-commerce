<template>
    <div>
        <manageSidebar></manageSidebar>
        <addProductForm id="add-product-form"></addProductForm>
    </div>
</template>

<script>
    import manageSidebar from "../components/manageSidebar.vue"
    import addProductForm from "../components/addProductForm.vue";
    
    export default {
        name: "AddProductPage",
        components: {
            manageSidebar,
            addProductForm
        }
    }
</script>

<style scoped>
#add-product-form {
    left: 250px;
    position: absolute;
    width: calc(100vw - 250px)
}
</style>
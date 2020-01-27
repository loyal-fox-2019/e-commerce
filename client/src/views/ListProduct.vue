<template>
    <div id="listProduct">
        <listProductTable style="margin-top: 100px;" v-bind:products="products"></listProductTable>
    </div>
</template>

<script>
import listProductTable from '@/components/ListProductTable.vue';
import axios from 'axios';

export default {
    name: 'listProduct',
    components: {
        listProductTable
    },
    created() {
        this.getProducts();
        console.log(this.products)
    },
    data() {
        return {
            products: []
        }
    },
    methods: {
        getProducts: function() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/product'
            })
            .then(response => {
                this.products = response.data.data
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>
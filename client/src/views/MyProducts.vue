<template>
    <div class="row">
        <card v-for="(product,i) in products" :key="i" :product="product" :where="'home'" @productDeleted="allProducts" class='m-3'></card>
    </div>
</template>

<script>
import axios from "axios"
import card from "../components/Card"

export default {
    components: {
        card,
    },
    data(){
        return {
            products : [],
        }
    },
    methods : {
        fetchData(){
            axios({
                baseURL : "http://localhost:3000",
                url : '/product',
                method : 'get',
                headers : {
                token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log('berhasil get porducts')
                this.products = data.filter(product => {
                    return product.seller === localStorage.user
                })
            })
        },
    },
    created(){
        this.fetchData()
    }
}
</script>

<style>

</style>
<template>
    <div id="wheels">
        <div id="background" class="container-fluid" style="height: 100vh;">
            <div class="row" style="padding-top: 80px; height: 100%;">
                <div class="col-lg-6" style="height: 100%;">
                    <div class="card-product">
                        <div class="row">
                            <div class="col-lg-4" v-for="(product, i) in products" :key="i">
                                <router-link :to="{path: `/wheels/${product._id}`,}">
                                    <itemCard v-bind:product="product"></itemCard>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" style="height: 100%">
                    <div class="card-detail">
                        <router-view v-animate-css="'slideInUp'"></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import itemCard from '@/components/ItemCard.vue';
import axios from 'axios'

export default {
    name: 'wheels',
    components: {
        Navbar,
        itemCard
    },
    created() {
        this.getProducts();
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
                url: 'http://localhost:3000/product',
            })
            .then(response => {
                this.products = response.data.data
            })
            .catch(error => {
                console.log({error});
            }) 
        }
    }
}
</script>

<style scoped>
#background {
    background: linear-gradient(rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)),url('../assets/image/wheels-bg.jpg') no-repeat center;
    background-size: cover;
}

.card-product {
    box-shadow: 8px 8px 1px white;
    padding: 15px 30px 0 30px;
    background-color: grey;
    height: 95%;
    overflow: auto
}

.card-detail {
    height: 98.2%;
    overflow: auto;
}
</style>
<template>
  <div>
    <navbar></navbar>
    <!-- <div class="jumbotron jumbotron-fluid" :style="`background-image:url(${productData.picture});`">
        <div class="container" >
            <h1 class="display-4">Fluid jumbotron</h1>
            <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
    </div> -->
    <!-- <div class="row justify-content-around">
        <div class="col-sm-6" :style="`background-image:url(${productData.picture});`"></div>
        <div class="col-sm-6">
            <h5>Product Name: {{ productData.name }}</h5>
            <h6>Price: {{ productData.price }}</h6>
            <p>Description: {{ productData.description }}</p>
            <p>In Stock: {{ productData.stock }}</p>
            <div class="flex align-item-center">
                <b-form-input type="number" style="width: 200px;"></b-form-input><b-button variant="success">Add to Cart</b-button>
            </div>
        </div>
    </div> -->
    <div class="container">
        <div class="row" style="background: yellow;border-radius:15px;margin-top: 9vh;">
            <div class="col-sm-4">
                <div style="width:100%;height:390px;">
                    <img :src="productData.picture" style="width:100%;object-fit:contain;height:100%;" alt="">
                </div>
            </div>
            <div class="col-sm ">
                <div class="row">
                    <h3>{{productData.name}}</h3>
                </div>
                <div class="row">
                    <div class="col-sm-2 p-2">
                        <h5>Price</h5>
                    </div>
                    <div class="col-sm p-2">
                        <h5>{{productData.price}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2">
                        <h5>Description</h5>
                    </div>
                    <div class="col-sm">
                        <h5>{{productData.description}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2">
                        <h5>Stock</h5>
                    </div>
                    <div class="col-sm">
                        <h5>{{productData.stock}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2">
                        <input type="number" style="width: 200px;">
                    </div>
                    <div class="col-sm">
                        <button type="button" class="btn btn-outline-warning" v-on:click="addToCart">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from '../components/navbar'
export default {
    name: 'productdetail',
    components:{
        navbar
    },
    data(){
        return{
            productData: null
        }
    },
    computed: {
        productId(){
            return this.$route.params.id
        }
    },
    created(){
        console.log(this.productId, 'product id')
            axios({
                method: 'get',
                url: `http://localhost:3000/product/${this.productId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data, 'product detail')
                this.productData = data
            })
            .catch(err=>{
                console.log(err)
            })
    },
    watch:{
        $route: function(){
            console.log('hoy')
            axios({
                method: 'get',
                url: `http://localhost:3000/product/${this.productId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data, 'product detail')
                this.productData = data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
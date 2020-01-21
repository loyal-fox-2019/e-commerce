<template>
  <div>
    <navbar></navbar>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">Fluid jumbotron</h1>
            <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
    </div>
    <div class="row justify-content-around">
        <div class="col-sm-6">
            <img src="" alt="">
        </div>
        <div class="col-sm-6">
            <h5>{{ productData.name }}</h5>
            <h6>{{ productData.price }}</h6>
            <p>{{ productData.description }}</p>
            <div class="flex align-item-center">
                <b-form-input type="number" style="width: 200px;"></b-form-input><b-button variant="success">Button</b-button>
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
        console.log('hoy')
            axios({
                method: 'get',
                url: `http://localhost:3000/product/${this.productId}`
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
                url: `http://localhost:3000/product/${this.productId}`
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
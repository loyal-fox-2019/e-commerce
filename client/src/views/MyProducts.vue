<template>
  <div>
      <NavBar @productAdded="addProduct"></NavBar>
      <div class="container-fluid p-0 m-0">
        <div class="loader" v-if="isLoading">
          <div class="text-center mb-3 d-flex justify-content-between">
            <b-spinner
                variant='primary'
            ></b-spinner>
          </div>
        </div>
          <div class="row">
            <MyProductList @deleted="getData" v-for="product in myProducts" :item="product" :key="product._id"></MyProductList>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar'
import MyProductList from '../components/MyProductList'
export default {
    name: 'my-products',
    data(){
        return {
            myProducts: [],
            isLoading: false
        }
    },
    components: {
        NavBar,
        MyProductList
    },
    methods: {
        addProduct: function(payload){
            this.myProducts.push(payload)
        },
        loading: function(){
            this.isLoading = true
        },
        getData: function(){
            axios({
                method: 'get',
                url: "http://localhost:3000/products/myProducts",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.myProducts = data
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        axios({
            method: 'get',
            url: "http://localhost:3000/products/myProducts",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            this.myProducts = data
        })
        .catch(err=>{
            console.log(err);
        })
    }

}
</script>

<style>

</style>
<template>
  <div>
      <NavBar @nowLoading="loading" @productAdded="fetchProducts"></NavBar>
      <div class="loader" v-if="isLoading">
          <div class="text-center mb-3 d-flex justify-content-between">
            <b-spinner
                variant='primary'
            ></b-spinner>
          </div>
      </div>
      <div class="container-fluid p-0 m-0">
        <div class="loader" v-if="isLoading">
          <div class="text-center mb-3 d-flex justify-content-between">
            <b-spinner
                variant='primary'
            ></b-spinner>
          </div>
        </div>
        <div class="d-flex mx-auto overflow-hidden" v-if="myProducts">
            <div class="row mx-2 w-100">
                <MyProductList @deleted="getData" v-for="product in myProducts" :item="product" :key="product._id"></MyProductList>
            </div>
        </div>
        <div class="row justify-content-center mt-5" v-if="myProducts[0] == undefined">
            <h2>You don't have any product yet!</h2>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar'
import MyProductList from '../components/MyProductList'
import Swal from 'sweetalert2'
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
        fetchProducts: function(){
            this.$router.push('/')
        },
        loading: function(){
            this.isLoading = true
        },
        getData: function(){
            axios({
                method: 'get',
                url: "http://ecommerce-server.kennys.my.id:3000/products/myProducts",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.myProducts = data
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error'
                })
            })
        }
    },
    created(){
        axios({
            method: 'get',
            url: "http://ecommerce-server.kennys.my.id:3000/products/myProducts",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            this.myProducts = data
        })
        .catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Error'
            })
        })
    }

}
</script>

<style scoped>
.loader {
    position: fixed;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
}
</style>
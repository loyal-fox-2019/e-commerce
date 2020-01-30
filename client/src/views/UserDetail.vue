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
        <b-container fluid id="container">
            <b-row class="pt-5 pb-1" align-h="center">
                <img :src="userData.profpic" id="profpic" class="rounded-circle">
            </b-row>
            <b-row class="pb-1" align-h="center">
                <router-link :to="{name: 'profpic'}"><b-button size="sm" variant="success">Change picture</b-button></router-link>
            </b-row>
            <b-row class="pb-2" align-h="center">
                <router-view></router-view>
            </b-row>
            <b-row class="" align-h="center">
                <h5>Name: {{userData.name}}</h5>
            </b-row>
            <b-row class="" align-h="center">
                <h5>Email: {{userData.email}}</h5>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "user-detail",
    data(){
        return{
            userData: {},
            newPicture: null,
            isLoading: false
        }
    },
    methods: {
        fetchProducts: function(){
            this.$router.push('/')
        },
        loading: function(){
            this.isLoading = true
        },
        getUserData: function(){
            axios({
                method: 'get',
                url: "http://ecommerce-server.kennys.my.id:3000/users",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.userData = data
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error'
                })
            })
        }
    },
    components: {
        NavBar
    },
    created(){
        axios({
            method: 'get',
            url: "http://ecommerce-server.kennys.my.id:3000/users",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            this.userData = data
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
#profpic {
    height: 150px;
    border: 4px solid rgb(77, 168, 77);
}
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
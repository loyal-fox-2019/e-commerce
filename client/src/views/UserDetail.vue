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
            <b-row class="pb-3" align-h="center">
                <b-button v-b-modal.modal-add-picture size="sm" variant="success">Change picture</b-button>
            </b-row>
            <b-row class="" align-h="center">
                <h5>Name: {{userData.name}}</h5>
            </b-row>
            <b-row class="" align-h="center">
                <h5>Email: {{userData.email}}</h5>
            </b-row>
        </b-container>
        <!-- modal add picture -->
        <b-modal id="modal-add-picture" title="Change picture" hide-footer>
            <b-form-file
                id="inputFile"
                v-model="newPicture"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
            >
            </b-form-file>
            <div class="pt-3">
                <b-button variant="light" v-on:click.prevent="clear" @click="$bvModal.hide('modal-add-picture')">Cancel</b-button>
                <b-button class="ml-4" variant="primary" v-on:click.prevent="updatePic" @click="$bvModal.hide('modal-add-picture')">Submit</b-button>
            </div>
        </b-modal>
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
                url: "http://localhost:3000/users",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.userData = data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        updatePic: function(){
            let formData = new FormData()
            formData.append('profpic', this.newPicture)
            axios({
                method: "patch",
                url: "http://localhost:3000/users/profpic",
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(()=>{
                this.getUserData()
                Swal.fire({
                    icon: 'success',
                    title: 'Profile picture changed!'
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    components: {
        NavBar
    },
    created(){
        axios({
            method: 'get',
            url: "http://localhost:3000/users",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            this.userData = data
        })
        .catch(err=>{
            console.log(err);
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
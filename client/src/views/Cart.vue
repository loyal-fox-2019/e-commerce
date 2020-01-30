<template>
    <div id="cart">
        <div class="container-fluid" 
        style="margin-top: 100px;
        padding-left: 0 !important; 
        padding-right: 0 !important;">
            <h2 class="pl-3 mb-3">Your Cart</h2>
            <cartTable @delete-item="deleteItem" v-animate-css="'fadeInRight'" v-bind:carts="carts"></cartTable>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import cartTable from '@/components/cartTable.vue';
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'cart',
    components: {
        Navbar,
        cartTable
    },
    created() {
        axios({
            method: 'get',
            url: 'http://localhost:3000/cart',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(respond => {
            this.carts = respond.data.data
        })
        .catch(error => {
            console.log({error});
        })
    },
    data() {
        return {
            carts: []
        }
    },
    methods : {
        deleteItem(id){
            //filter this.cart berdasarkan id yang tiak ssama dengan paramenter ATAU
            //getUlang datanya 
        }
    }
}
</script>

<style>

</style>
<template>
    <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 mt-3">
        <div class="card p-2">
            <img class="card-img-top rounded" v-b-modal="`detail${item._id}`" v-bind:src="item.picture" alt="Card image cap">
            <div class="card-body pt-2 px-1 mt-2">
                <h5 class="card-title" v-b-modal="`detail${item._id}`">{{ item.name }}</h5>
                <p class="card-text">
                    <i class="fas fa-money-bill-wave"></i> {{ rupiahPrice }}
                </p>
                <div class="row mt-4">
                    <div class="col-1" id="box-image">
                        <i class="fas fa fa-store-alt"></i>
                    </div>
                    <div class="col-10 seller">
                        Seller: {{ item.userOwner.name }}
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-1" id="box-image">
                        <i class="fas fa-lg fa-box-open"></i>
                    </div>
                    <div class="col-7" id="stock">
                        Stock: {{ item.stock }}
                    </div>
                    <div class="col-1" v-b-modal="`detail${item._id}`">
                        <i class="fas fa-lg fa-info-circle"></i>
                    </div>
                </div>
            </div>
        </div>   
        <b-modal :id="`detail${item._id}`" title="Product detail" hide-footer>
            <b-row>
                <b-col cols="5">
                    <img id="detail-image" v-bind:src="item.picture" alt="Card image cap">
                </b-col>
                <b-col cols="7">
                    <b-row>
                        <p>Name: {{item.name}}</p>
                    </b-row>
                    <b-row>
                        <p>Description: {{item.description}}</p>
                    </b-row>
                    <b-row>
                        <p><i class="fas fa-money-bill-wave"></i> {{rupiahPrice}}</p>
                    </b-row>
                    <b-row>
                        <p><i class="fas fa fa-store-alt"></i> Seller: {{ item.userOwner.name }}</p>
                    </b-row>
                    <b-row>
                        <p><i class="fas fa-lg fa-box-open"></i> Stock: {{ item.stock }}</p>
                    </b-row>
                    <b-row v-if="String(item.userOwner._id) !== currentUser">
                        <b-col cols="3">
                            <input id="qty" type="number" v-model="cartQty" min="1">
                        </b-col>
                        <b-col cols="9">
                            <i v-on:click.prevent="addCart" @click="$bvModal.hide(`detail${item._id}`)" class="fas fa-cart-plus"></i>
                        </b-col>
                    </b-row>
                    <b-row v-else>
                        This is your product
                    </b-row>
                </b-col> 
            </b-row>      
        </b-modal>
    </div>                   
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "product-list",
    props: {
        item: Object
    },
    data(){
        return {
            cartQty: null,
            currentUser: localStorage.getItem('userId')
        }
    },
    methods: {
        addCart: function(){
            axios({
                method: 'patch',
                url: 'http://ecommerce-server.kennys.my.id:3000/users/addCart',
                data: {
                    item: this.item._id,
                    quantity: this.cartQty
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                Swal.fire({
                    icon: 'success',
                    title: data.message
                })
            })
            .catch(err=>{   
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.message
                })   
            })
        }
    },
    computed: {
        rupiahPrice: function(){
            let angka = this.item.price
            let rupiah = '';		
            let numReverse = angka.toString().split('').reverse().join('');
            for(let i = 0; i < numReverse.length; i++) if(i%3 == 0) rupiah += numReverse.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }
    }
}
</script>

<style scoped>
#qty {
    width: 65px;
    font-size: 13px;
    height: 30px;
}

#detail-image {
    width: 100%;
}

img:hover {
    cursor: pointer;
}

.card-title {
    cursor: pointer;
}

.card-text {
    font-weight: bold;
}

h5 {
    font-weight: bold;
}

.seller {
    text-align: left;
    font-size: 14px;
    color: rgb(63, 91, 119);
}

#stock {
    text-align: left;
    font-size: 14px;
}

.fa-cart-plus {
    font-size: 28px;
    vertical-align: middle;
    color: rgb(75, 158, 54);
}

.fa-cart-plus:hover {
    filter: brightness(70%);
    cursor: pointer;
}

.fa-cart-plus:active {
    filter: brightness(100%);
}

.fa-store-alt {
    color: rgb(75, 158, 54);
}

.fa-box-open {
    color: rgb(75, 158, 54);
}

.fa-money-bill-wave {
    color: rgb(75, 158, 54);
}

.fa-info-circle {
    color: rgb(56, 75, 185);
}

.fa-info-circle:hover {
    filter: brightness(50%);
    cursor: pointer;
}

.fa-info-circle:active {
    filter: brightness(100%);
    cursor: pointer;
}

.card-img-top {
    width: 100%;
    height: 12vw;
    object-fit: cover;
}

</style>
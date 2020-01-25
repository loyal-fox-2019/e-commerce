<template>
<div class="col-12 row-card">
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <img class="card-image" :src="detail.item.picture">
                </div>
                <div class="col-7">
                    <h4 class="mb-3">{{detail.item.name}}</h4>
                    <p>{{detail.item.description}}</p>
                    <p><i class="fas fa-money-bill-wave"></i> {{rupiahPrice}}</p>
                    <p><i class="fas fa-box-open"></i> Stock available: {{detail.item.stock}}</p>
                    <p>Quantity: {{detail.quantity}} <i class="far fa-edit dashboard-img" v-b-modal="`edit${detail._id}`"></i></p>
                    <p><i class="fas fa-money-bill-wave"></i> Total this item: {{rupiahTotal}}</p>
                </div>
                <div class="col-1">
                    <i class="fas fa-trash-alt fa-lg dashboard-img" @click="removeItem"></i>
                </div>
            </div>
        </div>
        <b-modal :id="`edit${detail._id}`" title="Edit quantity" hide-footer>
            <b-row>
                <b-col cols="3">
                    <input id="qty" type="number" v-model="cartQty" min="1">
                </b-col>
                <b-col cols="9">
                    <b-button v-on:click.prevent="editQty" @click="$bvModal.hide(`edit${detail._id}`)"  variant="outline-success">Edit</b-button>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "cart-detail",
    data(){
        return{
            cartQty: null
        }
    },
    props: {
        detail: Object
    },
    methods: {
        removeItem: function(){
            Swal.fire({
                title: `Removing "${this.detail.item.name}" from cart`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(confirmed=>{ 
                if(confirmed.value) {
                    return axios({
                        method: 'patch',
                        url: "http://localhost:3000/users/remove-item",
                        data: {
                            cartData: this.detail
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                }
                else if(confirmed.dismiss == 'cancel'){
                    Swal.close()
                }
            })
           .then(({data})=>{
                Swal.fire({
                    icon: 'success',
                    title: data.message
                })
                this.$emit('doneEdit') 
           })
        },
        editQty: function(){
            axios({
                method: 'patch',
                url: "http://localhost:3000/users/edit-cart",
                data: {
                    newQuantity: this.cartQty,
                    cartData: this.detail
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
                this.$emit('doneEdit') 
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
            let angka = this.detail.item.price
            let rupiah = '';		
            let numReverse = angka.toString().split('').reverse().join('');
            for(let i = 0; i < numReverse.length; i++) if(i%3 == 0) rupiah += numReverse.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        },
        rupiahTotal: function(){
            let angka = this.detail.item.price * this.detail.quantity
            let rupiah = '';		
            let numReverse = angka.toString().split('').reverse().join('');
            for(let i = 0; i < numReverse.length; i++) if(i%3 == 0) rupiah += numReverse.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }
    }
}
</script>

<style scoped>
p {
    font-size: 18px;
}

#qty {
    width: 100px;
    font-size: 13px;
    height: 30px;
}

.row-card {
    width: 100%!Important;
}

.card-image {
    height: 180px;
    width: 100%;
    object-fit: cover;
    border-radius: 10px
}

.fa-box-open {
    color: rgb(75, 158, 54);
}

.fa-money-bill-wave {
    color: rgb(75, 158, 54);
}

.fa-edit {
    filter: opacity(90%);
    color: rgb(241, 30, 30);
    font-weight: bold;
    margin-left: 5px;
}

.fa-edit:hover {
    cursor: pointer;
    filter: opacity(100%)
}

.fa-edit:active {
    cursor: pointer;
    filter: opacity(90%);
}

.fa-trash-alt {
    filter: opacity(90%);
    color: rgb(223, 51, 51);
}

.fa-trash-alt:hover {
    cursor: pointer;
    filter: opacity(100%)
}

.fa-trash-alt:active {
    filter: opacity(90%);
    cursor: pointer;
}
</style>
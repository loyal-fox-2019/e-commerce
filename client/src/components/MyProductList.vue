<template>
    <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 mt-3">
        <div class="card p-2">
            <img class="card-img-top rounded" v-bind:src="item.picture" alt="Card image cap">
            <div class="card-body pt-2 px-1 mt-2">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                    <i class="fas fa-money-bill-wave"></i> {{ rupiahPrice }}
                </p>
                <div class="row mt-2">
                    <div class="col-1" id="box-image">
                        <i class="fas fa-box-open"></i>
                    </div>
                    <div class="col-5" id="stock">
                        {{ item.stock }}
                    </div>
                    <div class="col-1">
                        <i class="far fa-edit dashboard-img" v-on:click="goToUpdate(item.title, item.content, item._id)"></i>
                    </div>
                    <div class="col-1">
                        <i class="fas fa-trash-alt dashboard-img" @click="delProduct(item.name, item._id)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: 'my-product-list',
    props: {
        item: Object
    },
    computed: {
        rupiahPrice: function(){
            let angka = this.item.price
            let rupiah = '';		
            let numReverse = angka.toString().split('').reverse().join('');
            for(let i = 0; i < numReverse.length; i++) if(i%3 == 0) rupiah += numReverse.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }
    },
    methods: {
        delProduct: function(name, id){
            let productId = id
            let productName = name
            Swal.fire({
                title: `Deleting Product "${productName}"`,
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
                        method: 'delete',
                        url: `http://localhost:3000/products/${productId}`,
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
                Swal.fire(
                    `Product "${data.name}" deleted!`,
                    'Product deletion success.',
                    "success"
                )
                this.$emit('deleted')
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

#stock {
    text-align: left;
    font-size: 14px;
}
h5 {
    font-weight: bold;
}

.card-text {
    font-weight: bold;
}

.fa-box-open {
    color: rgb(75, 158, 54);
}

.fa-edit {
    filter: opacity(90%);
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

.fa-box-open {
    color: rgb(75, 158, 54);
}

.fa-money-bill-wave {
    color: rgb(75, 158, 54);
}

.card-img-top {
    width: 100%;
    height: 12vw;
    object-fit: cover;
}

</style>
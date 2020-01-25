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
                        <i class="far fa-edit dashboard-img" v-b-modal="`my-edit${item._id}`"></i>
                    </div>
                    <div class="col-1">
                        <i class="fas fa-trash-alt dashboard-img" @click="delProduct(item.name, item._id)"></i>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :id="`my-edit${item._id}`" title="Edit Product" hide-footer>
            <form>
                <div class="form-group">
                    <label for="inputName">Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Product Name" v-model="editName">
                </div>
                <div class="form-group">
                    <label for="inputDescription">Description</label>
                    <textarea class="form-control" id="inputDescription" placeholder="Product Description" rows="2" v-model="editDescription"></textarea>
                </div>
                <div class="form-group">
                    <label for="inputPrice">Price</label>
                    <input class="form-control" type="number" value="0" id="inputPrice" v-model="editPrice">
                </div>
                <div class="form-group">
                    <label for="inputStock">Stock</label>
                    <input class="form-control" type="number" value="0" id="inputStock" v-model="editStock">
                </div>
                <div class="form-group">
                    <label for="inputFile">Image</label>
                    <b-form-file
                        id="inputFile"
                        v-model="editPicture"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                    >
                    </b-form-file>
                </div>
                <b-button variant="light" v-on:click.prevent="clear" @click="$bvModal.hide(`my-edit${item._id}`)">Cancel</b-button>
                <b-button class="ml-4" variant="primary" v-on:click.prevent="editProduct" @click="$bvModal.hide(`my-edit${item._id}`)">Submit</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: 'my-product-list',
    data() {
        return{
            editName: this.item.name,
            editDescription: this.item.description,
            editPrice: this.item.price,
            editStock: this.item.stock,
            editPicture: null
        }
    },
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
        clear: function(){
            this.editName = this.item.name,
            this.editDescription = this.item.description,
            this.editPrice = this.item.price,
            this.editStock = this.item.stock,
            this.editPicture = null
        },
        editProduct: function() {
            let formData = new FormData()
            formData.append('name', this.editName)
            formData.append('description', this.editDescription)
            formData.append('price', this.editPrice)
            formData.append('stock', this.editStock)
            if(this.editPicture !== null) {
                formData.append('picture', this.editPicture)
            }
            axios({
                method: 'patch',
                url: `http://localhost:3000/products/${this.item._id}`,
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })   
            .then(({data})=>{
                this.$emit('deleted')
                Swal.fire(
                    `Product "${data.name}" updated!`,
                    'Update success.',
                    "success"
                )
            })  
            .catch(err=>{
                console.log(err);
            }) 
        },
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
<template>
  <div>
    <b-button v-b-modal.modal-center @click="$bvModal.show('bv-modal-newproduct')">Add New Product</b-button>

    <b-modal id="bv-modal-newproduct" centered title="BootstrapVue">

        <form method="post" enctype="multipart/form-data">
            <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Add New Product</h1>
            <label for="inputUsername" class="sr-only">Product Name</label>
            <input v-model="productName" type="text" class="form-control" placeholder="Product's Name" required="" autofocus="">
            <label for="inputEmail" class="sr-only">Product Price</label>
            <input v-model="productPrice" type="number" class="form-control" placeholder="Product's Price" required="" autofocus="">
            <label for="description" class="sr-only">Product Description</label>
            <textarea v-model="productDescription"  name="" id="" cols="30" rows="10" placeholder="Product's Description"></textarea>
            <label for="tock" class="sr-only">Product In Stock</label>
            <input v-model="productStock" type="number" class="form-control" placeholder="Product's Stock" required="" autofocus="">
            <input v-on:change="uploadPicture" type="file" name="file" />
        </form>


        <template v-slot:modal-footer>
            <div class="w-100">
            <b-button
                variant="primary"
                size="sm"
                class="float-right"
                v-on:click="newProduct"
                @click="$bvModal.hide('bv-modal-newproduct')"
            >
                Add Product
            </b-button>
            </div>
        </template>
    </b-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'newproduct',
    data(){
        return {
            productName: '',
            productPrice: '',
            productDescription: '',
            productStock: '',
            productPicture: ''
        }
    },
    methods:{
        uploadPicture(){
           this.productPicture = event.target.files[0]
        },
        newProduct(){
            const formData = new FormData()
            formData.append('name', this.productName)
            formData.append('description', this.productDescription)
            formData.append('stock', this.productStock)
            formData.append('picture', this.productPicture)
            formData.append('price', this.productPrice)
            axios({
                method: 'post',
                url: `http://localhost:3000/product`,
                headers:{
                    token: localStorage.getItem('token')
                },
                data: formData
            })
            .then(({data})=>{
                console.log(data,'di komponen addnewproduct')
                this.$emit('created-product', data)
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
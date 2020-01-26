<template>
  <div>
    <navbar></navbar>
    <div class="container">
        <div class="row" style="background: #FFF8E8;border-radius:15px;margin-top: 9vh;">
            <div class="col-sm-4" style="margin-left: 10vw;">
                <div style="width:100%;height:500px;">
                    <img :src="productData.picture" style="width:100%;object-fit:contain;height:100%;" alt="">
                </div>
            </div>
            <div class="col-sm" style="margin-left: 10vw;">
                <div class="row" style="margin-top: 9vh;margin-left: 2vw;">
                    <h3>{{productData.name}}</h3>
                </div>
                <div class="row">
                    <div class="col-sm-2 p-2 m-2">
                        <h5>Price</h5>
                    </div>
                    <div class="col-sm p-2 m-2" >
                        <h5>{{productData.price}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2 p-2 m-2">
                        <h5>Description</h5>
                    </div>
                    <div class="col-sm p-2 m-2">
                        <h5>{{productData.description}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2 p-2 m-2">
                        <h5>Stock</h5>
                    </div>
                    <div class="col-sm p-2 m-2">
                        <h5>{{productData.stock}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2">
                        <input v-if="productData.UserId!=userId" type="number" v-model="qty" style="width: 200px;border-radius: 10px;">
                    </div>
                    <div class="col-sm" style="margin-left: 5vw;">
                        <button style="" type="button" class="btn btn-outline-warning" v-on:click.prevent="addToCart" v-if="productData.UserId._id!=userId">Add To Cart</button>
                        <b-modal :id="`${productData._id}`" centered title="BootstrapVue">
                            
                            <form method="post" enctype="multipart/form-data">
                                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
                                <h1 class="h3 mb-3 font-weight-normal">Update Product</h1>
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
                                    v-on:click="updateProduct" 
                                    @click="$bvModal.hide(`${productData._id}`)"
                                >
                                    Update Product
                                </b-button>
                                </div>
                            </template>

                        </b-modal>
                    </div>
                </div>
                <div class="row" style="margin-top:10px;">
                    <div class="col-sm">
                        <button type="button" class="btn btn-success" v-on:click.prevent="deleteProduct" v-if="productData.UserId._id==userId">Delete Product</button>
                    </div>
                    <div class="col-sm">
                        <b-button 
                        @click="$bvModal.show(`${productData._id}`)"
                        v-b-modal.modal-center 
                        type="button" class="btn btn-success" 
                        v-if="productData.UserId._id==userId">Update Product</b-button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from '../components/navbar'
export default {
    name: 'productdetail',
    components:{
        navbar
    },
    data(){
        return{
            productName: '',
            productPrice: 0,
            productData: {},
            productDescription: '',
            productStock: 0,
            productPicture: '',
            qty: 0,
            userId: localStorage.getItem('userId')
        }
    },
    computed: {
        productId(){
            return this.$route.params.id
        }
    },
    methods:{
        uploadPicture(){
           this.productPicture = event.target.files[0]
        },
        updateProduct(){
            const formData = new FormData()
            formData.append('name', this.productName)
            formData.append('description', this.productDescription)
            formData.append('stock', this.productStock)
            formData.append('picture', this.productPicture)
            formData.append('price', this.productPrice)
            axios({
                method: 'put',
                url: `http://localhost:3000/product/${this.productId}`,
                headers:{
                    token: localStorage.getItem('token')
                },
                data:formData
            })
            .then(({data})=>{
                console.log(data)
                this.$router.push('/user/products')
            })
            .catch(err=>{
                console.log(err)
            })
        },
        addToCart(){
            console.log('masuk add to cart')
            if(this.productData.stock>=this.qty){
                 axios({
                method: 'post',
                url: `http://localhost:3000/cart/${this.productData._id}`,
                headers:{
                    token: localStorage.getItem('token')
                },
                data:{
                    Quantity: this.qty
                }
                })
                .then(({data})=>{
                    this.$router.push('/user/cart')
                    console.log(data)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        deleteProduct(){
            console.log('masuk delete')
            axios({
                method: 'delete',
                url: `http://localhost:3000/product/${this.productId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.$router.push('/user/products')
                console.log(data.message)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
        console.log(this.productId, 'product id')
            axios({
                method: 'get',
                url: `http://localhost:3000/product/${this.productId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data, 'product detail')
                this.productData = data
            })
            .catch(err=>{
                console.log(err)
            })
    },
    watch:{
        $route: function(){
            console.log('hoy')
            axios({
                method: 'get',
                url: `http://localhost:3000/product/${this.productId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data, 'product detail')
                this.productData = data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
h5{
    text-align: left;
}
</style>
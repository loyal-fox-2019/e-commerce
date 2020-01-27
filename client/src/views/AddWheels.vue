<template>
    <div id="addWheels">
        <div class="container" style="margin-top: 100px; margin-bottom: 20px;">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="form-card">
                        <form v-on:submit.prevent="submitForm()">
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Upload Image</label>
                                <input type="file" class="form-control-file" v-on:change="inputImage">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Brand</label>
                                <input type="text" class="form-control" v-model="brand" placeholder="Input wheels brand name">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Type</label>
                                <input type="text" class="form-control" v-model="type" placeholder="Input wheels type">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea class="form-control" v-model="description" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Stock</label>
                                <input type="number" class="form-control" v-model="stock" placeholder="Input wheels stocks">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Price</label>
                                <input type="number" class="form-control" v-model="price" placeholder="Input wheels price">
                            </div>
                            <div class="button-container mt-4">
                                <button class="btn btn-dark btn-lg" 
                                style="width: 100%; font-size: 25px; font-weight: 500;">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'addWheels',
    data() {
        return {
            file: '',
            brand: '',
            type: '',
            description: '',
            stock: 0,
            price: 0
        }
    },
    methods: {
        inputImage: function(event) {
            this.file = event.target.files[0]
        },
        submitForm: function() {
            const formData = new FormData();
            formData.append("file", this.file);
            formData.set("brand", this.brand);
            formData.set("type", this.type);
            formData.set("description", this.description);
            formData.set("stock", this.stock);
            formData.set("price", this.price);
            axios({
                method: 'post',
                url: 'http://localhost:3000/product',
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(respond => {
                swal.fire({
                    icon: 'success',
                    title: 'Add product success'
                })
                this.$router.push('/');
            })
            .catch(error => {
                const errorRespond = {error};
                if(Array.isArray(errorRespond.error.response.data.errors)) {
                    swal.fire({
                    icon: 'error',
                    title: 'Add product failed',
                    text: `${errorRespond.error.response.data.errors[0]}`
                    }) 
                } else {
                    swal.fire({
                    icon: 'error',
                    title: 'Add product failed',
                    text: `${errorRespond.error.response.data.errors}`
                    })
                }
            })
        }
    }
}
</script>

<style>
.form-card {
    padding: 20px 40px;
    box-shadow: 0 0 5px black;
    border-radius: 10px;
}
</style>